const goLiveBtn = document.getElementById('goLiveBtn');
const cameraSection = document.getElementById('cameraSection');
const video = document.getElementById('video');
const captureBtn = document.getElementById('captureBtn');
const uploadSection = document.getElementById('uploadSection');
const preview = document.getElementById('preview');
const postBtn = document.getElementById('postBtn');
const successMessage = document.getElementById('successMessage');
const captionInput = document.getElementById('caption');
const categoryInput = document.getElementById('category');
const postsContainer = document.getElementById('postsContainer');

let capturedImage = null;
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dk4pbv05b/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'ml_default';
const BACKEND_BASE_URL = 'https://localhost:5000/api/v1/users';

async function loadPosts() {

  // Load from localStorage first
  const localData = JSON.parse(localStorage.getItem('localPosts') || '[]');
  localData.forEach(post => displayPost(post, true)); 

  try {
    const res = await fetch(`${BACKEND_BASE_URL}/get-user-posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const posts = await res.json();

    //Clear localStorage to avoid duplicates
    localStorage.removeItem('localPosts');

    //Load fresh post data from backend
    posts.forEach(displayPost);
  } catch (error) {
    console.error('Error loading posts:', error);
  }
}

function displayPost(post) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${post.image}" alt="Post Image" />
    <p><strong>${post.user}</strong> from <em>${post.location}</em> at ${new Date(post.time).toLocaleString()}</p>
    <p>${post.caption} <strong>(${post.category})</strong></p>
    <div class="actions">
      <button onclick="likePost('${post.id}')">Like</button>
      <button onclick="commentPost('${post.id}')">Comment</button>
      <button onclick="dislikePost('${post.id}')">Dislike</button>
      <button onclick="sharePost('${post.id}')">Share</button>
      <button onclick="deletePost('${post.id}', this)">Delete</button>
    </div>
    
    <div class="replies" id="replies-${post.id}"></div>
    <div class="reply-input">
      <input type="text" id="replyInput-${post.id}" placeholder="Write a reply..." />
      <button onclick="addReply('${post.id}')">Reply</button>
    </div>
  `;
  postsContainer.prepend(card);

  // Save to localStorage (unless explicitly skipped)
  if (!skipStorage) {
    const saved = JSON.parse(localStorage.getItem('localPosts') || '[]');
    localStorage.setItem('localPosts', JSON.stringify([post, ...saved]));
  }

  if (post.replies) {
    post.replies.forEach(reply => displayReply(post.id, reply));
  }
}

function displayReply(postId, reply) {
  const repliesDiv = document.getElementById(`replies-${postId}`);
  const replyDiv = document.createElement('div');
  replyDiv.className = 'reply';
  replyDiv.id = `reply-${reply.id}`;
  replyDiv.innerHTML = `
    <p><strong>${reply.user}</strong>: <span id="reply-text-${reply.id}">${reply.text}</span></p>
    <input type="text" id="edit-reply-${reply.id}" class="hidden" value="${reply.text}" />
    <button onclick="toggleEditReply('${reply.id}')">Edit</button>
    <button onclick="updateReply('${reply.id}')">Update</button>
    <button onclick="deleteReply('${reply.id}', '${postId}')">Delete</button>
  `;
  repliesDiv.appendChild(replyDiv);
}

async function addReply(postId) {
  const input = document.getElementById(`replyInput-${postId}`);
  const replyText = input.value.trim();
  if (!replyText) {
    alert('Please enter a reply before submitting!');
    return;
  }

  try {
    const res = await fetch(`${BACKEND_BASE_URL}/add-reply/${postId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: replyText, user: 'Current User' })
    });
    
    const newReply = await res.json();
    displayReply(postId, newReply);
    input.value = '';
  } catch (error) {
    console.error('Error adding reply:', error);
  }
}

function toggleEditReply(replyId) {
  const editInput = document.getElementById(`edit-reply-${replyId}`);
  const replyTextSpan = document.getElementById(`reply-text-${replyId}`);
  const editBtn = editInput.previousElementSibling;
  editInput.classList.toggle('hidden');
  replyTextSpan.classList.toggle('hidden');
  editBtn.textContent = editInput.classList.contains('hidden') ? 'Edit' : 'Cancel';
}

async function updateReply(replyId) {
  const newText = document.getElementById(`edit-reply-${replyId}`).value;
  if (!newText.trim()) return;

  try {
    await fetch(`${BACKEND_BASE_URL}/update-reply/${replyId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText })
    });

    document.getElementById(`reply-text-${replyId}`).textContent = newText;
    toggleEditReply(replyId);
  } catch (error) {
    console.error('Error updating reply:', error);
  }
}

async function deleteReply(replyId, postId) {
  try {
    await fetch(`${BACKEND_BASE_URL}/delete-reply/${replyId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    const replyDiv = document.getElementById(`reply-${replyId}`);
    replyDiv?.remove();
  } catch (error) {
    console.error('Error deleting reply:', error);
  }
}

async function deletePost(id, btn) {
  try {
    await fetch(`${BACKEND_BASE_URL}/delete-post/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    //Remove the post from localStorage
    const saved = JSON.parse(localStorage.getItem('localPosts') || '[]');
    const updated = saved.filter(post => post.id !== id);
    localStorage.setItem('localPosts', JSON.stringify(updated));

    // Remove the post from the UI
    btn.closest('.card').remove();
  } catch (error) {
    console.error('Error deleting post:', error);
  }
}

function likePost(id) {
  alert(`Liked post ${id}`);
}

function commentPost(id) {
  alert(`Comment on post ${id}`);
}

function dislikePost(id) {
  alert(`Disliked post ${id}`);
}

function sharePost(id) {
  alert(`Shared post ${id}`);
}

goLiveBtn.onclick = async () => {
  cameraSection.classList.remove('hidden');

  if (!video.srcObject) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  }
};

captureBtn.onclick = () => {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  capturedImage = canvas.toDataURL('image/jpeg');
  preview.src = capturedImage;
  uploadSection.classList.remove('hidden');
};

postBtn.onclick = async () => {
  if (!capturedImage) return;

  const formData = new FormData();
  formData.append('file', capturedImage);
  formData.append('upload_preset', 'ml_default');

  try {
    const cloudRes = await fetch(CLOUDINARY_URL, { method: 'POST', body: formData });
    const cloudData = await cloudRes.json();
    const imageUrl = cloudData.secure_url;

    const locationRes = await fetch(`${BACKEND_BASE_URL}/get-posts-by-location`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const location = await locationRes.json();

    const post = {
      image: imageUrl,
      caption: captionInput.value,
      category: categoryInput.value,
      user: 'Current User',
      location: location.city || 'Unknown',
      time: new Date().toISOString()
    };

    const backendRes = await fetch(`${BACKEND_BASE_URL}/upload-post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    });

    const savedPost = await backendRes.json();
    displayPost(savedPost);

    successMessage.classList.remove('hidden');
    setTimeout(() => successMessage.classList.add('hidden'), 3000);

    captionInput.value = '';
    categoryInput.value = 'crime';
    uploadSection.classList.add('hidden');
    cameraSection.classList.add('hidden');
  } catch (error) {
    console.error('Error posting:', error);
  }
};

// Initial call
loadPosts();
