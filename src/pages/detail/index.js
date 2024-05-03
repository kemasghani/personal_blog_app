import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Detail() {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/${id}`);
                setPost(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }
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
        <div className='container'>
            <h1 className='tittleSinglePost'>{post.title}</h1>
            <div className="card-wrapper">
                <div className="profile-card">
                    <div>
                        <p className="card-title">Created by : {post.author.username}</p>
                        <p className="card-subtitle">Created at : {formatUpdatedAt(post.updatedAt)}</p>
                    </div>
                </div>
            </div>
            <figure className="card-banner img-holder-single">
                <img src={`${process.env.REACT_APP_API_URL}/image/${post.image}`} loading="lazy"
                    alt="Self-observation is the first step of inner unfolding" className="img-cover" />
            </figure>
            <p className='contentSinglePost'>{post.content}</p>
        </div>
    );
}

export default Detail;
