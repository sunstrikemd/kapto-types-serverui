### Usage:
`$ npx @kapto/typesuiserver --config-path=./types.config.json`

#### In case you won't specify ***--config-path*** parameter please consider define ***types.config.json*** file in the root of the project.

### Example of configuration File(***types.config.json***):
```javascript
{
    "SWAGGER_DOCUMENT_DIRECTORY": "./src/types/generated/openapi-api-spec.json",
    "PROXY_ADDRESS": "localhost",
    "PROXY_PORT": 8000,
    "SERVER_PORT": 3000
  ]
}
```