import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Index() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/`);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

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

    return (
        <div>
            <h1>All Posts</h1>

            <ul className="feature-list">
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
                                    <Link to={`/detail/${post.id}`} className="card-btn">Read more</Link>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Index;
