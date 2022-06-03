// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

contract DNS_Storage {
    struct Resolution {
        address owner;
        address addr;
        bool hideOwner;
        bytes32 signature;
    }
    string private DNS_Owner = "DNS_Owner";
    mapping(bytes32 => Resolution) public resolution;
    mapping(address => string) public assignation;
    mapping(bytes32 => address) public name_assignation;

    constructor() {
        bytes32 sig = sha256(abi.encodePacked(DNS_Owner));
        resolution[sig].owner = msg.sender;
        resolution[sig].addr = msg.sender;
        resolution[sig].signature = sig;
    }

    function name(string calldata _name) public pure returns (bytes32 _hash) {
        return sha256(abi.encodePacked(_name));
    }

    function registerName(address _from, string calldata _name)
        public
        returns (bool _ok)
    {
        bytes32 sig = name(_name);
        resolution[sig].owner = _from;
        resolution[sig].addr = _from;
        resolution[sig].hideOwner = false;
        resolution[sig].signature = sig;
        return true;
    }

    function updateName(string calldata _name, address _addr) public {
        bytes32 sig = name(_name);
        resolution[sig].addr = _addr;
    }

    function getContent(string calldata _name)
        public
        view
        returns (
            address _owner,
            address _associatedAddress,
            bytes32 _signature
        )
    {
        bytes32 sig = name(_name);
        address temp_owner = resolution[sig].owner;

        if (resolution[sig].hideOwner) {
            temp_owner = address(0);
        }
        return (temp_owner, resolution[sig].addr, resolution[sig].signature);
    }

    function ownerOf(string calldata _name)
        public
        view
        returns (address _owner)
    {
        bytes32 sig = name(_name);
        if (resolution[sig].hideOwner) {
            revert();
        }
        return resolution[sig].owner;
    }

    function assignName(string calldata _name, address _destination) public {
        // if(name_assignation[sha256(abi.encodePacked(assignation[_destination]))] != 0x0)
        // {
        //     revert();
        // }

        assignation[_destination] = _name;
        name_assignation[name(_name)] = _destination;
    }

    function getName(address _assignee)
        public
        view
        returns (string memory _name)
    {
        return assignation[_assignee];
    }

    function getAddressUsingNameHash(string calldata _name)
        public
        view
        returns (address _assignee)
    {
        return name_assignation[name(_name)];
    }
}
