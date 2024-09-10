import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

interface Message {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
}

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    useEffect(() => {
        // Simulate fetching chat history
        const initialMessages: Message[] = [
            { id: 1, sender: 'Trainer', content: 'Hello, how are you?', timestamp: '10:00 AM' },
            { id: 2, sender: 'Client', content: 'I’m good! What about the session today?', timestamp: '10:05 AM' },
        ];
        setMessages(initialMessages);
    }, []);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message: Message = {
                id: messages.length + 1,
                sender: 'You', // Simulate current user as the sender
                content: newMessage,
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages([...messages, message]);
            setNewMessage(''); // Clear input field after sending
        }
    };

    return (
        <Box display="flex" flexDirection="column" height="100vh">
            <Typography variant="h4" textAlign="center" gutterBottom>
                Chat with Trainer
            </Typography>

            <Paper elevation={3} sx={{ flex: 1, marginBottom: 2, padding: 2 }}>
                <List sx={{ height: '75vh', overflowY: 'auto' }}>
                    {messages.map((message) => (
                        <ListItem key={message.id}>
                            <ListItemText
                                primary={`${message.sender} at ${message.timestamp}`}
                                secondary={message.content}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>

            <Box display="flex" alignItems="center" padding={2} component="form">
                <TextField
                    label="Type a message..."
                    variant="outlined"
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} // Send on Enter key
                />
                <Button variant="contained" color="primary" sx={{ marginLeft: 2 }} onClick={handleSendMessage}>
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default Chat;
