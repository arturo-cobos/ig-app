pragma solidity ^0.7.4;

contract PhotoAlbum {
    
    mapping(uint => Photo) photos;
    
    struct Photo {
        string name;
        string picture;
    }
    
    uint public photosLength = 0;
    
    // photos.length
    function publishPhoto(uint _id, string memory _name, string memory _picture) external {
        photos[_id] = Photo({ name: _name, picture: _picture});
        photosLength++;
    }
    
    function getPhoto(uint _id) view external returns(string memory name, string memory picture) {
        return (photos[_id].name, photos[_id].picture);
    }
    
    function deletePhoto(uint _id) external {
        delete photos[_id];
        photosLength--;
    }
    
    function updatePhoto(uint _id, string memory _name, string memory _picture) external {
        // Photo storage photo = photos[_id];
        photos[_id].name = _name;
        photos[_id].picture = _picture;
    }
}