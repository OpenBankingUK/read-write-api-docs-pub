# Namespaced Enumerations - v4.0 <!-- omit in toc -->

- [Overview](#overview)
- [Basics](#basics)
  - [Design Principles](#design-principles)
  - [Release Management](#release-management)

## Overview

The specification defines certain fields with only a fixed set of possible values as enumerations, and further additions to possible values require a Specification change.

As part of Version 3 Open Banking Specifications defined new custom Data Types, which are an extendable list of enumerated values. Any extensions to this standard list of values can be done by the ASPSPs, with relevant documentation on their Developer Portals.

The extendable Data Type values are namespaced, to help identify the issuer of the value, and the relevant value.

Version 4 of the specification introduced further alignment to ISO 20022 with the use of ISO 20022 code values.  OBL specific enums have been allocated a 4 character code and will be submitted for inclusion in the ISO 20022 external codelist in due course.

## Basics

These Data Types, in general, are called namespaced enumerations.

Specific API Data Dictionary will define a custom Data Type class, which will help lookup the OBL defined standard set of namespaced enumerations in this specification page as well as respective swagger files.

The namespaced enumeration values specified by Open Banking are documented here and will be prefixed by `UK.OBIE.`

### Design Principles

When extending a namespaced enumeration:
* ASPSPs **must not** publish an ASPSP-specific enumerated value where a generic OBL defined enumerated value or ISO 20022 code value may be used.
* ASPSPs **must** place such values in a namespace consisting of their two-letter country code (ISO 3166-1 Alpha-2 code), followed by a full-stop, followed by their name. e.g.
  *  UK.Barclays.PingIt
  *  KE.Safaricom.M-Pesa

### Release Management

Usage of non-namespaced values may be discontinued in a future version of this standard.


A comprehensive list of enumerations, from both OBL and ISO 20022, have been catalogued and made available [here](https://github.com/OpenBankingUK/External_Internal_CodeSets).  

ASPSPs and TPPs should reference this repository for an up-to-date list of enums and values.

Note: ASPSPs may define enumerations that are more appropriate and document in the Developer Portal.