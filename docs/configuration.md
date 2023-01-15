# Configuration

## Default configuration files

### `data/apis.json`
```json
{
    "gwServer": "http://localhost:9000/v1",
    "gwServerWS": "ws://localhost:9000/",
    "cdn": "http://localhost:8083"
}
```

**Clarification**: This configuration file contains a list of named APIs and their respective URLs.

---

### `data/client-cfg.json`
```json
{
    "HB_REFRESH_RATE": 5000
}
```

**Clarification**:
 - `HB_REFRESH_RATE` - How often the client should check whether the logged in user has a valid session.


---

### `data/server.json`
```json
{
    "http": {
        "port": "4096"
    }
}
```

**Clarification**:
 - `http.port` - The port to use when running the client HTTP server.




