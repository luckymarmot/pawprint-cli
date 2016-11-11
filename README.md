# Pawprint CLI

A Node.js utility tool to create and manage Pawprints HTTP traces.

## Example

You can create a Pawprint out of any `curl` command:

```shell
curl  --trace - https://httpbin.org/get | pawpt
```

<img src="https://cl.ly/1b1u2z0E002w/Pawprint%20CLI%20Example@2x.png" width="641" />

This will allow you to view on a nice webpage or share it as a short link.

<img src="https://cl.ly/2e1a1J0K2M19/Pawprint%202%20Blog%20Article%20(1)@2x.png" width="688" alt="Share HTTP traces in a beautiful UI via Pawprint by Paw" />

## Options

- `-p, --private` Create a private Pawprint. This means the Pawprint will be created with an access token, so only people who you share the full URL (including access token) with, will be able to access the data. Also, this means the Pawprint won't be indexed by search engines.
- `-c, --copy` Copies the public share link in the clipboard so it's ready to paste in another app.

## Dependencies

This tool is based one a few other open source projects, mostly:

- [curl-trace-parser](https://github.com/apiaryio/curl-trace-parser) Parser for output from Curl --trace option
- [chalk](https://github.com/chalk/chalk) Terminal string styling done right
- [request](https://github.com/request/request) Simplified HTTP request client.

## License

This repository is released under the [MIT License](LICENSE). Feel free to fork, and modify!
Copyright © 2016 Paw Inc.
