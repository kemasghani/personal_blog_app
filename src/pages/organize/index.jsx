import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function Index() {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const userId = localStorage.getItem('userId');
    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/user/${userId}`);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    useEffect(() => {
        fetchPosts();
    }, []);

    const formatUpdatedAt = (updatedAt) => {
        const date = new Date(updatedAt);
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const meridiem = hours >= 12 ? 'PM' : 'AM';
        const formattedDate = `${month} ${day}, ${year} at ${hours % 12 || 12}:${minutes} ${meridiem}`;
        return formattedDate;
    };

    const handleEditClick = (post) => {
        setSelectedPost(post);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = {
            title: formData.get('title'),
            content: formData.get('content'),
            category: formData.get('category'),
        };
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/post/${selectedPost.id}`, updatedData);
            console.log(response.data);
            fetchPosts();
            handleCloseModal();
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };
    const handleDeleteClick = async (postId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/post/${postId}`);
            fetchPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
    return (
        <div>
            <h1>All Posts</h1>

            <ul className="feature-list-organize">
                {posts.map(post => (
                    <li key={post.id}>
                        <div className="card feature-card">
                            <figure className="card-banner img-holder">
                                <img src={`${process.env.REACT_APP_API_URL}/image/${post.image}`} loading="lazy"
                                    alt="Self-observation is the first step of inner unfolding" className="img-cover" />
                            </figure>
                            <div className="card-content">
                                <div className="card-wrapper">
                                    <div className="card-tag">
                                        <p href="#" className="card-category">#{post.category}</p>
                                    </div>
                                </div>
                                <h3 className="headline headline-3">
                                    <p href="#" className="card-title hover-2">{post.title}</p>
                                </h3>
                                <div className="card-wrapper">
                                    <div className="profile-card">
                                        <div>
                                            <p className="card-title">Created by : {post.author.username}</p>
                                            <p className="card-subtitle">{formatUpdatedAt(post.updatedAt)}</p>
                                        </div>
                                    </div>
                                    <div className='buttonContainer'>
                                        <Button variant="danger" onClick={() => handleDeleteClick(post.id)}>Delete</Button>
                                        <Button variant="primary" onClick={() => handleEditClick(post)}>Edit</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Edit Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedPost && (
                        <form onSubmit={handleFormSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter tittle" name='title' defaultValue={selectedPost.title} size='lg' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Content</Form.Label>
                                <Form.Control type="textarea" placeholder="Enter content" name='content' defaultValue={selectedPost.content} size='lg' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Category</Form.Label>
                                <Form.Control type="text" placeholder="Enter category" name='category' defaultValue={selectedPost.category} size='lg' />
                            </Form.Group>
                            <Modal.Footer>
                                <Button variant="primary" type='submit'>
                                    Save changes
                                </Button>
                                <Button variant="secondary" onClick={handleCloseModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </form>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Index;
