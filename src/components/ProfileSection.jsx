import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageCard from '../components/MessageCard';
import AlertToast from './AlertToast';

function ProfileSection() {
  const [selectedTab, setSelectedTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [reposts, setReposts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('id');
  const [showMediaModel, setShowMediaModel] = useState(false);
  const [deletePostAlert, setdeletePostAlert] = useState(false);
  const [changeAvatarAlert, setchangeAvatarAlert] = useState(false);

  const imagePlaceholder =
    'https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg';
  const [imageUrl, setImageUrl] = useState(imagePlaceholder);
  const [inputImageUrl, setInputImageUrl] = useState('');

  const urlUsers = 'https://6682ae934102471fa4c7cf55.mockapi.io/users';
  const urlPosts = 'https://6682ae934102471fa4c7cf55.mockapi.io/posts';

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = () => {
    axios.get(`${urlUsers}/${userId}`).then((userResponse) => {
      const userData = userResponse.data;
      setUser(userData);
      setImageUrl(userData.avatar || imagePlaceholder);

      axios.get(urlPosts).then((postsResponse) => {
        const userPosts = postsResponse.data.filter(
          (post) => post.authorId === userId
        );
        fetchAvatars(userPosts, setPosts);
      });

      axios.get(urlPosts).then((repostsResponse) => {
        const userReposts = repostsResponse.data.filter((post) =>
          post.repost.includes(userId)
        );
        fetchAvatars(userReposts, setReposts);
      });

      axios.get(urlPosts).then((likedPostsResponse) => {
        const userLikedPosts = likedPostsResponse.data.filter((post) =>
          post.likes.includes(userId)
        );
        fetchAvatars(userLikedPosts, setLikedPosts);
      });
    });
  };

  const fetchAvatars = (posts, setPostsState) => {
    const fetchAvatars = posts.map((post) => {
      return axios
        .get(`${urlUsers}/${post.authorId}`)
        .then((authorResponse) => {
          const authorData = authorResponse.data;
          return {
            ...post,
            authorAvatar: authorData.avatar || imagePlaceholder,
          };
        });
    });
    Promise.all(fetchAvatars).then((postsWithAvatars) => {
      setPostsState(postsWithAvatars.reverse());
    });
  };

  const handleDeletePost = (postId) => {
    axios.delete(`${urlPosts}/${postId}`).then(() => {
      setPosts(posts.filter((post) => post.id !== postId));
      setdeletePostAlert(true);
      setTimeout(() => {
        setdeletePostAlert(false);
      }, 2000);
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const imageChanger = (e) => {
    setInputImageUrl(e.target.value);
    if (e.target.value === '') {
      setImageUrl(imagePlaceholder);
    } else {
      setImageUrl(e.target.value);
    }
  };

  function changeImage() {
    if (inputImageUrl !== '') {
      axios.put(`${urlUsers}/${userId}`, {
        avatar: inputImageUrl,
      });
      setUser((prevUser) => ({
        ...prevUser,
        avatar: inputImageUrl,
      }));
      setShowMediaModel(false);
      setchangeAvatarAlert(true);
      setTimeout(() => {
        setchangeAvatarAlert(false);
      }, 2000);
    } else {
      alert('Image URL needed');
    }
  }

  return (
    <>
      {deletePostAlert && <AlertToast text={'Post deleted successfully'} />}
      {changeAvatarAlert && <AlertToast text={'Avatar updated successfully'} />}

      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
        open={showMediaModel}
      >
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-primary">Update Avatar</h3>
          <div className="avatar flex-col justify-center items-center gap-5 max-md:max-w-screen w-full my-3">
            <div className="w-[360px] h-[360px] max-md:w-full max-md:h-auto flex justify-center items-center flex-col">
              <img
                className="w-full h-full object-cover rounded"
                src={imageUrl}
                alt="Avatar"
              />
            </div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Add image</span>
              </div>
              <input
                type="url"
                placeholder="https://image.jpeg"
                className="input input-bordered w-full max-w-xs"
                value={inputImageUrl}
                onChange={imageChanger}
              />
            </label>
          </div>
          <div className="modal-action">
            <div className="flex gap-5">
              <button className="btn" onClick={() => setShowMediaModel(false)}>
                Cancel
              </button>
              <button onClick={changeImage} className="btn btn-primary">
                Edit
              </button>
            </div>
          </div>
        </div>
      </dialog>
      <div className="p-4">
        <div className="mb-4">
          <div className="flex flex-col">
            <img
              className="w-24 h-24 rounded-full"
              src={user.avatar || imagePlaceholder}
              alt="Avatar"
            />
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-white">{user.userName}</h2>
              <p className="text-gray-400">@{user.accountName}</p>
              <p className="text-gray-400">Joined Jul - 2024 </p>
              <div className="flex space-x-4 mt-2">
                <p className="text-gray-400">
                  <span className="font-bold text-white">
                    {user.following.length}
                  </span>{' '}
                  Following
                </p>
                <p className="text-gray-400">
                  <span className="font-bold text-white">
                    {user.followers.length}
                  </span>{' '}
                  Followers
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowMediaModel(true);
              }}
              className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-full"
            >
              Edit avatar
            </button>
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              className={`py-2 px-4 rounded ${
                selectedTab === 'posts'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => setSelectedTab('posts')}
            >
              Posts
            </button>
            <button
              className={`py-2 px-4 rounded ${
                selectedTab === 'reposts'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => setSelectedTab('reposts')}
            >
              Reposts
            </button>
            <button
              className={`py-2 px-4 rounded ${
                selectedTab === 'likes'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => setSelectedTab('likes')}
            >
              Likes
            </button>
          </div>
        </div>

        <div>
          {selectedTab === 'posts' && (
            <div>
              {posts.map((post) => (
                <MessageCard
                  key={post.id}
                  authorName={post.authorName}
                  userName={post.userName}
                  post={post.postContent}
                  comments={post.comments.length}
                  repost={post.repost.length}
                  likes={post.likes.length}
                  image={post.image}
                  isLiked={post.likes.includes(userId)}
                  isRepost={post.repost.includes(userId)}
                  onDelete={() => handleDeletePost(post.id)}
                  showDeleteOption={true}
                  avatar={post.authorAvatar || imagePlaceholder}
                />
              ))}
            </div>
          )}
          {selectedTab === 'reposts' && (
            <div>
              {reposts.map((post) => (
                <MessageCard
                  key={post.id}
                  authorName={post.authorName}
                  userName={post.userName}
                  post={post.postContent}
                  comments={post.comments.length}
                  repost={post.repost.length}
                  likes={post.likes.length}
                  image={post.image}
                  isLiked={post.likes.includes(userId)}
                  isRepost={post.repost.includes(userId)}
                  avatar={post.authorAvatar || imagePlaceholder}
                />
              ))}
            </div>
          )}
          {selectedTab === 'likes' && (
            <div>
              {likedPosts.map((post) => (
                <MessageCard
                  key={post.id}
                  authorName={post.authorName}
                  userName={post.userName}
                  post={post.postContent}
                  comments={post.comments.length}
                  repost={post.repost.length}
                  likes={post.likes.length}
                  image={post.image}
                  isLiked={post.likes.includes(userId)}
                  isRepost={post.repost.includes(userId)}
                  avatar={post.authorAvatar || imagePlaceholder}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileSection;
