package com.example.topiefor.model.DTO;

public class ConversationDTO {

    private String id;

    private String otherUsername;

    private byte[] otherUserProfilePic;

    private String otherUserStatus;

    public ConversationDTO() {
    }

    public ConversationDTO(String id, String otherUsername, byte[] otherUserProfilePic, String otherUserStatus) {
        this.id = id;
        this.otherUsername = otherUsername;
        this.otherUserProfilePic = otherUserProfilePic;
        this.otherUserStatus = otherUserStatus;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOtherUsername() {
        return otherUsername;
    }

    public void setOtherUsername(String otherUsername) {
        this.otherUsername = otherUsername;
    }

    public byte[] getOtherUserProfilePic() {
        return otherUserProfilePic;
    }

    public void setOtherUserProfilePic(byte[] otherUserProfilePic) {
        this.otherUserProfilePic = otherUserProfilePic;
    }

    public String getOtherUserStatus() {
        return otherUserStatus;
    }

    public void setOtherUserStatus(String otherUserStatus) {
        this.otherUserStatus = otherUserStatus;
    }
}
