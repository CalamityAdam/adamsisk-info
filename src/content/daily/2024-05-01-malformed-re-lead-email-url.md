title: Malformed RE Lead Email URL
date: 2024-05-01
author: Adam Sisk

# the problem

we noticed a clarity recording of a user that landed on the results page and NO pros appeared. Upon digging, this was the URL:

`https://trusted.ramseysolutions.com/real-estate/referrals/results/RFID23T3UELL03GM?buy=urn:lampo:sa_partner_id:56606,urn:lampo:sa_partner_id:9652,urn:lampo:sa_partner_id:59742?utm_medium=email&_kx=cSpXEDhamzsNzrRp5T6GqLLbNS0XbrAKRVgxymj6PWA.RzHn5B`

## why this is a problem

we can split this URL into 3 distinct parts:

1. the domain and the path
   `https://trusted.ramseysolutions.com/real-estate/referrals/results/RFID23T3UELL03GM`
2. the list of pro partner URNs
   `?buy=urn:lampo:sa_partner_id:56606,urn:lampo:sa_partner_id:9652,urn:lampo:sa_partner_id:59742`
3. the marketing parameters
   `?utm_medium=email&_kx=cSpXEDhamzsNzrRp5T6GqLLbNS0XbrAKRVgxymj6PWA.RzHn5B`

the problem here is the marketing params includes a `?` at the start. this is a malformed URL, as a URL should only have a single `?` designating where in the URL string the query parameters start. the marketing params should instead begin with a `&`, signifying continuing the parameters instead of trying to "start" the parameters.

## How we got here

### the past

previously the URL we supplied in the _new RE referral klaviyo event_ looked one way. like this:

```md
referral_url=
https://trusted.ramseysolutions.com/real-estate/referrals/results/RFID23T3UELL03GM
```

In Klaviyo, we added utm parameters to the URL by combining a string to create the href attribute for the email's CTA buttons. like this:

```md
href=
{referral_url} + "?utm_medium=email&utm_campaign=campaign-123456&etc"

👆 this turns into 👇

https://trusted.ramseysolutions.com/real-estate/referrals/results/RFID23T3UELL03GM?utm_medium=email&utm_campaign=campaign-123456&etc
(it's long, scroll over)
```

when users clicked a cta in a real estate lead journey email they would navigate to that 👆 URL, and all was well in the world. But! this url was irregular compared to the URL that a user is sent to after filling out the referral form.

After filling out the RE referral form the user was sent to a URL that included the partner URNs of all of the pros on this referral, organized into a `buy` list and a `sell` list. Here's a real URL that a real user was recently sent to after filling out the form. This was a buy only referral with 3 pros.

```md
https://trusted.ramseysolutions.com/real-estate/referrals/results/RFID23T3UELL03GM?buy=urn:lampo:sa_partner_id:56606,urn:lampo:sa_partner_id:9652,urn:lampo:sa_partner_id:59742
(it's long, scroll over)
```

The difference of these 2 URLs caused some issues with optimizely experiments...it's complicated. so we fixed it 😏

### the present(ish), and how we didn't fix it

Early in April we made a change to the payload we sent with the _new RE referral klaviyo event_. specifically we modified the `referral_url` to include the list of `buy` and `sell` pros' `partner_urn`s, to match that which the user first sees immediately following referral form submission.

```md
referral_url=
https://trusted.ramseysolutions.com/real-estate/referrals/results/RFID23T3UELL03GM?buy=urn:lampo:sa_partner_id:56606,urn:lampo:sa_partner_id:9652,urn:lampo:sa_partner_id:59742
```

**this is a breaking change**. the way which utm parameters are added to the URL **must** change to no longer be prepended with a `?` but instead with a `&`. Previously the **start** of the query parameters in the referral URL was being added in klaviyo. Now the start of the query parameters is happening in the _new RE referral klaviyo event_ payload. Klaviyo is simply **continuing** the query params, thus should start with a `&` as so:

```md
href=
{referral_url} + "&utm_medium=email&utm_campaign=campaign-123456&etc"

👆 this turns into 👇

https://trusted.ramseysolutions.com/real-estate/referrals/results/RFID23T3UELL03GM?buy=urn:lampo:sa_partner_id:56606,urn:lampo:sa_partner_id:9652,urn:lampo:sa_partner_id:59742&utm_medium=email&utm_campaign=campaign-123456&etc
(it's long, scroll over)
```

If the CTA's url/href in klaviyo was not updated to be using a `&` instead of a `?` this would break the fetching of pros' data to display on the page. If this happened, here's what the list of partner URNs would look like:

```tsx
pros = {
  'urn:lampo:sa_partner_id:56606',
  'urn:lampo:sa_partner_id:9652',
  'urn:lampo:sa_partner_id:59742?utm_medium=email';
}
```

Because the utm parameters would begin with a `?`, `utm_medium=email` is not being picked up as a valid parameter and instead it's being included in one of the `partner_urn`s.

This isn't a problem though. Around april 8th/9th space cowboys + fight club worked together to get all of the URLs in the emails updated to use a `&`. There were 20+ locations to make this change, in a very painfully manual and slow tedious manner. We tested this well, and were confident with the change.

### we missed one 🙈

In one or two instances there are **other** places in the email where we link to the results page. specifically on the `View Full Profile` link displayed next to the pros' pictures. We didn't consider that this url is actually just the exact same URL as in the CTA.

On May 1st we observed a Clarity session recording of a case where a user landed on the results page (directly, not redirected) and no pros were displayed. The URL included partner URNs so this was a big red flag. We realized our previous fear had come true 😭 the page was breaking because it was trying to fetch a pro with the partner URN of `urn:lampo:sa_partner_id:59742?utm_medium=email`.

We checked dynatrace/loggly and found a small error that corresponds to this issue but was not being caught in a useful way. **Since April 8 there have been around 1400+ occurrences** of a user clicking a malformed URL in a real estate email. It's unclear at this time exactly how many users that represents. A conservative guess would say that we might see up to 3 of these clicks per user, so maybe up to 500 individual users experienced this. (We don't see the need to take the time to figure out exact numbers, we already know 1400+ events is not good.)

Fight Club via Zena fixed the offending links in the emails. Space Cowboys are adding additional alerting and improving the related logging to monitor if this issue will happen again.

_side note: just an observation of Klaviyo from me as an engineer: I'm surprised issues like this don't come up more often, it's incredibly clunky and slow to make any changes to an email template. Email marketers are brilliant for being able to pump out such excellence at such a high frequency using such primitive text editors_ 👏
