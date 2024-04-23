The class has gotten big, we should refactor some things to follow SOLID principles.

## formatPhoneNumber - refactor

new builder: `/builder/PhoneNumberFormattingBuilder`

```kotlin
@Component
class PhoneNumberFormattingBuilder {
    private var phoneNumber: String? = null

    fun withNumber(phoneNumber: String?): PhoneNumberFormattingBuilder {
        this.phoneNumber = phoneNumber
        return this
    }

    fun withSanitization(): PhoneNumberFormattingBuilder {
        if (phoneNumber == null) return this

        // Remove all non-numeric characters except the leading +
        phoneNumber = phoneNumber?.replace("[^\\d+]".toRegex(), "")
        return this
    }

    fun withCountryCode(): PhoneNumberFormattingBuilder {
        if (phoneNumber == null) return this

        // check if the number already has the +1 country code
        phoneNumber = if (phoneNumber?.startsWith("+1") == true) {
            phoneNumber
        } else if (phoneNumber?.startsWith("1") == true) {
            // If it starts with 1, just add the +
            "+$phoneNumber"
        } else {
            // If it doesn't start with +1 or 1, add +1
            "+1$phoneNumber"
        }
        return this
    }

    fun build(): String? {
        return phoneNumber
    }
}
```

## transformPhotoUrl - refactor

new builder: `PhotoUrlTransformationBuilder`

```kotlin
@Component
class PhotoUrlTransformationBuilder {
    private var photoUrl: String? = null

    fun withPhotoUrl(photoUrl: String?): PhotoUrlTransformationBuilder {
        this.photoUrl = photoUrl
        return this
    }

    fun withEmailTransformer(): PhotoUrlTransformationBuilder {
        if (photoUrl?.contains("image/upload/") == true && !photoUrl.contains("t_elp_provider")) {
            photoUrl = photoUrl?.replace("image/upload/", "image/upload/t_elp_provider/")
        }
        return this
    }

    fun build(): String? {
        return photoUrl
    }
}
```

## URL building

<aside>
💡 for billboard, we need a list of INTEGER ids.
for results page, we need a list of STRING partner_urns.

</aside>

use cases:

- passing a list of IDs to billboard as integers
  - e.g. `12345,32154,08763`
- constructing query params for results page URL as strings
  - e.g. `buy=urn:lampo:sa_partner_id:27256,urn:lampo:sa_partner_id:27400,urn:lampo:sa_partner_id:35420&sell=urn:lampo:sa_partner_id:12345`

```kotlin
private fun buildPartnerUrnMap(agentList: Map<TransactionType, List<String>>): Map<TransactionType, List<String>> {
    val buyingQueryParams = agentList[TransactionType.BUY]?.map { it } ?: emptyList()
    val sellingQueryParams = agentList[TransactionType.SELL]?.map { it } ?: emptyList()

    return mapOf(
        TransactionType.BUY to buyingQueryParams,
        TransactionType.SELL to sellingQueryParams,
    )
}
```
