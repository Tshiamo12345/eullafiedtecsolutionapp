import { useState } from 'react';
import './messagePage.css';

function MessagePage() {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'unread', or 'groups'
    const [searchTerm, setSearchTerm] = useState('');

    // Sample data with unread status
    const people = [
        { id: 1, name: 'John Doe', lastMessage: 'Hey there!', time: '10:30 AM', avatar: 'JD', unread: 2, isOnline: true, isGroup: false },
        { id: 2, name: 'Jane Smith', lastMessage: 'How are you doing?', time: '9:15 AM', avatar: 'JS', unread: 0, isOnline: false, isGroup: false },
        { id: 3, name: 'Mike Johnson', lastMessage: 'See you tomorrow', time: 'Yesterday', avatar: 'MJ', unread: 1, isOnline: true, isGroup: false },
        { id: 4, name: 'Sarah Wilson', lastMessage: 'Thanks for the help!', time: 'Yesterday', avatar: 'SW', unread: 0, isOnline: false, isGroup: false },
        { id: 5, name: 'David Brown', lastMessage: 'Let me know when you\'re free', time: 'Monday', avatar: 'DB', unread: 3, isOnline: true, isGroup: false }
    ];

    // Sample group conversations
    const groupConversations = [
        { id: 6, name: 'Development Team', lastMessage: 'Meeting at 3 PM today', time: '11:45 AM', avatar: 'DT', unread: 5, isGroup: true, members: 8 },
        { id: 7, name: 'Project Alpha', lastMessage: 'Sarah: Updated the requirements', time: '10:20 AM', avatar: 'PA', unread: 0, isGroup: true, members: 12 },
        { id: 8, name: 'Marketing Team', lastMessage: 'Campaign launch next week', time: 'Yesterday', avatar: 'MT', unread: 2, isGroup: true, members: 6 },
        { id: 9, name: 'Design Review', lastMessage: 'Mike: Approved the mockups', time: 'Yesterday', avatar: 'DR', unread: 0, isGroup: true, members: 4 },
        { id: 10, name: 'Company Updates', lastMessage: 'HR: New policy announcement', time: 'Monday', avatar: 'CU', unread: 1, isGroup: true, members: 25 }
    ];

    // Combine people and groups for filtering
    const allConversations = [...people, ...groupConversations];

    const messages = {
        1: [
            { id: 1, text: 'Hey there!', sender: 'other', time: '10:30 AM' },
            { id: 2, text: 'Hi John! How are you?', sender: 'me', time: '10:32 AM' },
            { id: 3, text: 'I\'m doing great, thanks for asking!', sender: 'other', time: '10:35 AM' }
        ],
        2: [
            { id: 1, text: 'How are you doing?', sender: 'other', time: '9:15 AM' },
            { id: 2, text: 'I\'m good, thanks! How about you?', sender: 'me', time: '9:20 AM' }
        ],
        3: [
            { id: 1, text: 'See you tomorrow', sender: 'other', time: 'Yesterday' },
            { id: 2, text: 'Sure thing!', sender: 'me', time: 'Yesterday' }
        ],
        4: [
            { id: 1, text: 'Thanks for the help!', sender: 'other', time: 'Yesterday' },
            { id: 2, text: 'You\'re welcome!', sender: 'me', time: 'Yesterday' }
        ],
        5: [
            { id: 1, text: 'Let me know when you\'re free', sender: 'other', time: 'Monday' },
            { id: 2, text: 'I\'ll check my schedule and get back to you', sender: 'me', time: 'Monday' }
        ],
        6: [
            { id: 1, text: 'Meeting at 3 PM today', sender: 'other', time: '11:45 AM', senderName: 'John' },
            { id: 2, text: 'I\'ll be there', sender: 'me', time: '11:46 AM' },
            { id: 3, text: 'Same here!', sender: 'other', time: '11:47 AM', senderName: 'Sarah' }
        ],
        7: [
            { id: 1, text: 'Updated the requirements', sender: 'other', time: '10:20 AM', senderName: 'Sarah' },
            { id: 2, text: 'Thanks for the update', sender: 'me', time: '10:25 AM' }
        ],
        8: [
            { id: 1, text: 'Campaign launch next week', sender: 'other', time: 'Yesterday', senderName: 'Marketing Lead' },
            { id: 2, text: 'Excited for the launch!', sender: 'me', time: 'Yesterday' }
        ],
        9: [
            { id: 1, text: 'Approved the mockups', sender: 'other', time: 'Yesterday', senderName: 'Mike' },
            { id: 2, text: 'Great work everyone!', sender: 'me', time: 'Yesterday' }
        ],
        10: [
            { id: 1, text: 'New policy announcement', sender: 'other', time: 'Monday', senderName: 'HR' },
            { id: 2, text: 'When does this take effect?', sender: 'me', time: 'Monday' }
        ]
    };

    // Filter conversations based on active tab and search term
    const filteredPeople = allConversations
        .filter(conversation => {
            if (activeTab === 'unread') {
                return conversation.unread > 0;
            } else if (activeTab === 'groups') {
                return conversation.isGroup;
            }
            return true; // 'all' tab shows everything
        })
        .filter(conversation => 
            conversation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
        );

    // Count unread messages
    const unreadCount = allConversations.filter(conversation => conversation.unread > 0).length;
    const groupCount = groupConversations.length;

    const handleSendMessage = () => {
        if (newMessage.trim() && selectedPerson) {
            console.log('Sending message:', newMessage, 'to conversation:', selectedPerson);
            setNewMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleAttachmentClick = () => {
        // Create a file input element
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*,application/pdf,.doc,.docx,.txt,.xlsx,.xls,.ppt,.pptx';
        fileInput.multiple = true;
        
        fileInput.onchange = (e) => {
            const files = Array.from(e.target.files);
            console.log('Selected files:', files);
            // Here you would handle the file upload logic
            files.forEach(file => {
                console.log(`File: ${file.name}, Type: ${file.type}, Size: ${file.size}`);
            });
        };
        
        fileInput.click();
    };

    return (
        <div className="message-page">
            {/* Message Page Header */}
            <div className="message-page-header">
                <div className='myHeader'>
                <h1>Messages</h1>
                </div>
                {/* Search Bar */}
                <div className="search-container">
                    <div className="search-box">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search conversations by name or message..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        {searchTerm && (
                            <button
                                className="clear-search"
                                onClick={() => setSearchTerm('')}
                                title="Clear search"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <div className="file-nav-top">
                        <button
                            className={`nav-item ${activeTab === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveTab('all')}
                        >
                            <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2Z"/>
                            </svg>
                            <span className="nav-text">All Conversations</span>
                        </button>
                        <span className="nav-divider">/</span>
                        <button
                            className={`nav-item ${activeTab === 'unread' ? 'active' : ''}`}
                            onClick={() => setActiveTab('unread')}
                        >
                            <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z"/>
                            </svg>
                            <span className="nav-text">Unread</span>
                            {unreadCount > 0 && (
                                <span className="nav-unread-badge">{unreadCount}</span>
                            )}
                        </button>
                        <span className="nav-divider">/</span>
                        <button
                            className={`nav-item ${activeTab === 'groups' ? 'active' : ''}`}
                            onClick={() => setActiveTab('groups')}
                        >
                            <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"/>
                            </svg>
                            <span className="nav-text">Groups</span>
                            <span className="nav-count-badge">{groupCount}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="chat-container">
                {/* People List */}
                <div className="people-list">
                    <div className="people-header">
                        <h2>
                            {activeTab === 'all' && 'All Conversations'}
                            {activeTab === 'unread' && 'Unread Conversations'}
                            {activeTab === 'groups' && 'Group Conversations'}
                        </h2>
                        <div className="conversation-count">
                            {filteredPeople.length} conversations
                        </div>
                    </div>

                    <div className="people-items">
                        {filteredPeople.length > 0 ? (
                            filteredPeople.map(conversation => (
                                <div
                                    key={conversation.id}
                                    className={`person-item ${selectedPerson === conversation.id ? 'active' : ''} ${conversation.unread > 0 ? 'unread' : ''} ${conversation.isGroup ? 'group-conversation' : ''}`}
                                    onClick={() => setSelectedPerson(conversation.id)}
                                >
                                    <div className="person-avatar">
                                        {conversation.avatar}
                                        {conversation.isGroup && <div className="group-indicator">👥</div>}
                                        {!conversation.isGroup && conversation.isOnline && <div className="online-indicator"></div>}
                                    </div>
                                    <div className="person-info">
                                        <div className="person-name">
                                            {conversation.name}
                                            {conversation.isGroup && (
                                                <span className="member-count">({conversation.members})</span>
                                            )}
                                        </div>
                                        <div className="person-last-message">{conversation.lastMessage}</div>
                                    </div>
                                    <div className="person-time">
                                        <span>{conversation.time}</span>
                                        {conversation.unread > 0 && (
                                            <div className="person-unread-count">{conversation.unread}</div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-conversations-found">
                                <p>
                                    {searchTerm 
                                        ? `No conversations found matching "${searchTerm}"`
                                        : activeTab === 'unread' 
                                            ? 'No unread conversations'
                                            : activeTab === 'groups'
                                                ? 'No group conversations'
                                                : 'No conversations available'
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="chat-area">
                    {selectedPerson ? (
                        <>
                            {/* Chat Header */}
                            <div className="chat-header">
                                <div className="chat-person-info">
                                    <div className="chat-avatar">
                                        {allConversations.find(c => c.id === selectedPerson)?.avatar}
                                    </div>
                                    <div className="chat-person-details">
                                        <div className="chat-person-name">
                                            {allConversations.find(c => c.id === selectedPerson)?.name}
                                        </div>
                                        {allConversations.find(c => c.id === selectedPerson)?.isGroup && (
                                            <div className="chat-group-info">
                                                {allConversations.find(c => c.id === selectedPerson)?.members} members
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="messages-container">
                                {messages[selectedPerson]?.map(message => (
                                    <div
                                        key={message.id}
                                        className={`message ${message.sender === 'me' ? 'message-sent' : 'message-received'}`}
                                    >
                                        {message.sender === 'other' && allConversations.find(c => c.id === selectedPerson)?.isGroup && (
                                            <div className="message-sender-name">{message.senderName}</div>
                                        )}
                                        <div className="message-content">
                                            {message.text}
                                        </div>
                                        <div className="message-time">
                                            {message.time}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Message Input */}
                            <div className="message-input-container">
                                {/* Attachment Button */}
                                <button 
                                    className="attachment-button"
                                    onClick={handleAttachmentClick}
                                    title="Attach files or images"
                                >
                                    <svg className="attachment-icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z"/>
                                    </svg>
                                </button>

                                <input
                                    type="text"
                                    className="message-input"
                                    placeholder={`Type a message${allConversations.find(c => c.id === selectedPerson)?.isGroup ? ' to the group' : ''}...`}
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <button className="send-button" onClick={handleSendMessage}>
                                    Send
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="no-chat-selected">
                            <h3>Select a conversation to start chatting</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MessagePage;