### Usage:
`$ npx @kapto/typesuiserver --config-path=./uiserver.config.json`

#### In case you won't specify ***--config-path*** parameter please consider define ***uiserver.config.json*** file in the root of the project.

### Example of configuration File(***uiserver.config.json***):
```javascript
{
    "SWAGGER_DOCUMENT_DIRECTORY": "./src/types/generated/openapi-api-spec.json",
    "PROXY_ADDRESS": "localhost",
    "PROXY_PORT": 8000,
    "SERVER_PORT": 3000
}
```