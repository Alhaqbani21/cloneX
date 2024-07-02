import React, { useState, useEffect } from 'react';
import MessageCard from '../components/MessageCard';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import AlertToast from './AlertToast';

function MainSection() {
  const [postInput, setPostInput] = useState('');
  const [allPosts, setAllPosts] = useState([]);
  const [showMediaModel, setShowMediaModel] = useState(false);
  const imagePlaceholder =
    'https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg';
  const accountName = localStorage.getItem('accountName');
  const email = localStorage.getItem('email');
  const userId = localStorage.getItem('id');
  const userName = localStorage.getItem('userName');
  const [avatarUrl, setAvatarUrl] = useState(imagePlaceholder);
  const [inputImageUrl, setInputImageUrl] = useState('');
  const [imageAdded, setImageAdded] = useState('');
  const [user, setUser] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const [repostedPosts, setRepostedPosts] = useState([]);
  const [newPostAlert, setnewPostAlert] = useState(false);

  const urlUsers = 'https://6682ae934102471fa4c7cf55.mockapi.io/users';
  const urlPosts = 'https://6682ae934102471fa4c7cf55.mockapi.io/posts';

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  function fetchPosts() {
    axios.get(`${urlUsers}/${userId}`).then((response) => {
      const userData = response.data;
      setUser(userData);
      setAvatarUrl(userData.avatar || imagePlaceholder);
      setLikedPosts(userData.likedPosts || []);
      setRepostedPosts(userData.repostedPosts || []);
    });

    axios.get(urlPosts).then((response) => {
      const posts = response.data;

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
        setAllPosts(postsWithAvatars.reverse());
      });
    });
  }

  function handleAddPost() {
    if (postInput.trim() !== '') {
      axios
        .post(urlPosts, {
          authorName: userName,
          postContent: postInput,
          likes: [],
          repost: [],
          comments: [],
          image: imageAdded,
          authorId: userId,
          userName: accountName,
        })
        .then((response) => {
          const newPost = response.data;
          setAllPosts([newPost, ...allPosts]);
          setPostInput('');
          setImageAdded('');
          setnewPostAlert(true);
          setTimeout(() => {
            setnewPostAlert(false);
          }, 2000);
        })
        .catch((error) => {
          console.error('Error adding post:', error);
        });
    }
  }

  const handleLike = (postId) => {
    if (!user) return;

    const post = allPosts.find((post) => post.id === postId);
    if (!post || !post.likes) return;

    const isLiked = post.likes.includes(userId);

    const updatedPosts = allPosts.map((post) =>
      post.id === postId
        ? {
            ...post,
            likes: isLiked
              ? post.likes.filter((id) => id !== userId)
              : [...post.likes, userId],
          }
        : post
    );
    setAllPosts(updatedPosts);

    axios.put(`${urlPosts}/${postId}`, {
      likes: updatedPosts.find((post) => post.id === postId).likes,
    });

    const updatedUser = {
      ...user,
      likedPosts: isLiked
        ? user.likedPosts.filter((id) => id !== postId)
        : [...user.likedPosts, postId],
    };
    setUser(updatedUser);
    setLikedPosts(updatedUser.likedPosts);

    axios
      .put(`${urlUsers}/${userId}`, { likedPosts: updatedUser.likedPosts })
      .then(() => fetchPosts());
  };

  const handleRepost = (postId) => {
    if (!user) return;

    const post = allPosts.find((post) => post.id === postId);
    if (!post || !post.repost) return;

    const isReposted = post.repost.includes(userId);

    const updatedPosts = allPosts.map((post) =>
      post.id === postId
        ? {
            ...post,
            repost: isReposted
              ? post.repost.filter((id) => id !== userId)
              : [...post.repost, userId],
          }
        : post
    );
    setAllPosts(updatedPosts);

    axios.put(`${urlPosts}/${postId}`, {
      repost: updatedPosts.find((post) => post.id === postId).repost,
    });

    const updatedUser = {
      ...user,
      repostedPosts: isReposted
        ? (user.repostedPosts || []).filter((id) => id !== postId)
        : [...(user.repostedPosts || []), postId],
    };
    setUser(updatedUser);
    setRepostedPosts(updatedUser.repostedPosts);

    axios
      .put(`${urlUsers}/${userId}`, {
        repostedPosts: updatedUser.repostedPosts,
      })
      .then(() => fetchPosts());
  };

  const imageChanger = (e) => {
    setInputImageUrl(e.target.value);
    if (e.target.value === '') {
      setImageAdded('');
    } else {
      setImageAdded(e.target.value);
    }
  };

  function changeImage() {
    if (inputImageUrl !== '') {
      setImageAdded(inputImageUrl);
      setShowMediaModel(false);
    } else {
      alert('Image URL needed');
    }
  }

  return (
    <div className="mb-16">
      {newPostAlert && <AlertToast text={'Post sent successfully'} />}
      <div className="border pb-3 border-dim-200">
        <dialog
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle"
          open={showMediaModel}
        >
          <div className="modal-box">
            <h3 className="font-bold text-2xl text-primary">Add image</h3>
            <div className="avatar flex-col justify-center items-center gap-5 max-md:max-w-screen w-full my-3">
              <div className="w-[360px] h-[360px] max-md:w-full max-md:h-auto flex justify-center items-center flex-col">
                <img
                  className="w-full h-full object-cover rounded"
                  src={inputImageUrl || imagePlaceholder}
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
                <button
                  className="btn"
                  onClick={() => setShowMediaModel(false)}
                >
                  Cancel
                </button>
                <button onClick={changeImage} className="btn btn-primary">
                  Add
                </button>
              </div>
            </div>
          </div>
        </dialog>
        <div className="flex p-4">
          <img
            className="w-10 h-10 rounded-full"
            src={user ? user.avatar || imagePlaceholder : imagePlaceholder}
            alt="Avatar"
          />
          <div className="relative w-full">
            <TextareaAutosize
              onChange={(e) => {
                setPostInput(e.target.value);
              }}
              value={postInput}
              placeholder="What's happening?"
              className="p-2 text-white w-full h-16 bg-transparent focus:outline-none resize-none"
              maxLength={300}
              maxRows={10}
            />
            <div className="text-right text-xs text-gray-400 mt-1">
              {postInput.length}/300
            </div>
            {imageAdded && (
              <img
                className="rounded-2xl border border-gray-600 my-3 mr-2 w-20"
                src={imageAdded}
                alt="Post"
              />
            )}
          </div>
        </div>
        <div className="flex p-8 w-full">
          <button onClick={() => setShowMediaModel(true)}>
            <i className="fa-solid fa-image text-lg hover:text-blue-400 cursor-pointer"></i>
          </button>

          <button
            onClick={handleAddPost}
            className="font-bold bg-blue-400 text-white rounded-full px-6 ml-auto mr-1 flex items-center"
          >
            Post
          </button>
        </div>
      </div>
      <div className="text-center py-4 bg-dim-900 border border-dim-200 cursor-pointer text-blue-400 text-sm">
        Show 9 Posts
      </div>

      {allPosts.map((item, index) => (
        <MessageCard
          key={index}
          authorName={item.authorName}
          userName={item.userName}
          post={item.postContent}
          comments={item.comments.length}
          repost={item.repost.length}
          likes={item.likes.length}
          image={item.image}
          onClickLike={() => handleLike(item.id)}
          onClickRepost={() => handleRepost(item.id)}
          isLiked={likedPosts.includes(item.id)}
          isRepost={repostedPosts.includes(item.id)}
          avatar={item.authorAvatar}
        />
      ))}
    </div>
  );
}

export default MainSection;
