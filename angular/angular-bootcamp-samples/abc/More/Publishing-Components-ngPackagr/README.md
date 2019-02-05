# Publishing Components Example

This example shows how to set up an Angular library for distribution, either as a Angular module or as a standalone web component.

To build a package suitable for publishing an ngModule to npm, run

```
npm run build-lib
```
The relevant configuration for this in package.json is the $schema and ngPackage properties, which define the settings for ngPackagr and the entry file for the library, respectively. Check out public_api.ts as well for the last bit of configuration needed.
