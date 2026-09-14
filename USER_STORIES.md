# Hopsettle — User stories

**Product:** [PRODUCT.md](./PRODUCT.md)


### Superpeer operator

- As a superpeer operator, I want to open buyer and seller channels when REMOTEPEERs join my mesh, so that micropayments flow before DATA packets transmit.
- As a superpeer operator, I want alerts when my RMESH float cannot fund new channels, so that I top up before buyers are turned away.

### Internet-sharing seller

- As a seller, I want to set my price for sharing connectivity into the mesh, so that I earn RMESH proportional to bytes relayed.
- As a seller, I want closing-hash signatures acknowledged in my channel table, so that superpeer payments match delivered packets.

### Data buyer

- As a buyer, I want visibility into per-packet charges along multi-hop routes, so that I am not surprised by superpeer markup.
- As a buyer, I want to dispute accounted bytes with signature evidence, so that billing errors have a resolution path.

### Relay operator

- As a relay operator, I want byte attribution on forwarded DATA packets, so that future relay incentives can settle fairly.

### Finance analyst

- As a finance analyst, I want period statements of channel opens, closes, and net RMESH, so that mesh economics reconcile to treasury.

### Platform administrator

- As a platform administrator, I want to quarantine a superpeer whose signature accounting diverges from protocol logs, so that fraudulent settlement cannot propagate.
- As a platform administrator, I want negative-path rejection when channel smart-contract queries fail, so that unpaid DATA paths are not silently allowed.
