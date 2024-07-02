import React, { useState } from 'react';

function MessageCard(props) {
  const defaultAvatarUrl =
    'https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg';
  const avatarUrl = props.avatar || defaultAvatarUrl;
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="border border-dim-200 cursor-pointer pb-4 relative">
      <div className="flex p-4 pb-0">
        <img className="h-9 w-9 rounded-full" src={avatarUrl} alt="" />
        <p className="ml-2 flex flex-shrink-0 items-center font-medium text-white">
          {props.authorName}
          <span className="ml-1 text-sm leading-5 text-gray-400">
            @{props.userName} . Jul 2
          </span>
        </p>
        {props.showDeleteOption && (
          <div className="ml-auto relative">
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setShowMenu(!showMenu)}
            >
              <i className="fa-solid fa-ellipsis"></i>
            </button>
            {showMenu && (
              <div className="absolute right-0  w-max bg-transparent border border-dim-200 rounded shadow-lg ">
                <button
                  className="block w-full text-left px-4 py-2 text-red-800 "
                  onClick={props.onDelete}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="pl-8 xl:pl-16 pr-4">
        <p className="w-auto font-medium text-white">{props.post}</p>
        {props.image && (
          <img
            className="rounded-2xl border border-gray-600 my-3 mr-2 w-full"
            src={props.image}
            alt=""
          />
        )}
        <div className="flex items-center w-full justify-between mt-4">
          <div
            onClick={props.onClickComment}
            className="group flex items-center text-white text-xs hover:text-blue-400"
          >
            <svg
              fill="white"
              className="w-4 group-hover:fill-blue-400 mr-1"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"></path>
              </g>
            </svg>
            {props.comments}
          </div>
          <div
            onClick={props.onClickRepost}
            className={`group flex justify-center items-center text-white text-xs ${
              props.isRepost
                ? 'text-green-400 hover:text-white '
                : 'hover:text-green-400'
            }`}
          >
            <svg
              className={`w-5  mr-1 ${props.isRepost ? '' : ''}`}
              viewBox="0 0 21 21"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g
                  className={` ${
                    props.isRepost
                      ? 'stroke-green-400 group-hover:stroke-white'
                      : 'group-hover:stroke-green-400'
                  }`}
                  fill="none"
                  fillRule="evenodd"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="translate(1 4)"
                >
                  <path d="m12.5 9.5 3 3 3-3"></path>
                  <path d="m8.5.5h3c2.209139 0 4 1.790861 4 4v8"></path>
                  <path d="m6.5 3.5-3-3-3 3"></path>
                  <path d="m10.5 12.5h-3c-2.209139 0-4-1.790861-4-4v-8"></path>
                </g>
              </g>
            </svg>
            {props.repost}
          </div>
          <div
            onClick={props.onClickLike}
            className={`group flex justify-center items-center text-white text-xs ${
              props.isLiked
                ? 'text-red-600 hover:text-white '
                : 'hover:text-red-600'
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className={`w-5  mr-1 ${
                props.isLiked
                  ? 'fill-red-600 group-hover:fill-white'
                  : 'group-hover:fill-red-600'
              }`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier ">
                <path
                  className="group-hover:stroke-none"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                  stroke={props.isLiked ? 'none' : 'white'}
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
            {props.likes}
          </div>
          <div className="flex items-center text-white text-xs hover:text-blue-400"></div>
        </div>
      </div>
    </div>
  );
}

export default MessageCard;
