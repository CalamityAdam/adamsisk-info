The class has gotten big, we should refactor some things to follow SOLID principles.

## formatPhoneNumber - refactor

new builder: `/builder/PhoneNumberFormattingBuilder`

```kotlin
@Component
class PhoneNumberFormattingBuilder() {
  fun withNumber() {}
  fun withSanitization() {}
  fun withCountryCode() {}
}
```

## transformPhotoUrl - refactor

new builder: `PhotoUrlTransformationBuilder`

```kotlin
@Component
class PhotoUrlTransformationBuilder() {
  fun withPhotoUrl() {}
  fun withEmailTransformer() {}
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
