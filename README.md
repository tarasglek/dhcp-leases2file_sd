Scan dhcp-leases for things that might have prometheus /metrics endpoint and output to file_sd config

```
yarn run simple dhcp.leases dhcp.json
```watchexec -w dhcp.leases --force-poll 1000 yarn run simple dhcp.leases dhcp.json
