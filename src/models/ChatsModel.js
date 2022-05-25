export class ChatsModel{
    constructor(_values, _setters){
        this.model = {
            officialChats: _values.officialChats,
            communityChats: _values.communityChats,
            privateChats: _values.privateChats
        }
        this.setters = {
            officialChats: _setters.setOfficialChats,
            communityChats: _setters.setCommunityChats,
            privateChats: _setters.setPrivateChats
        }
    }
}