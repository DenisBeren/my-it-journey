// URL бесплатного тестового API (никаких ключей не нужно)
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async get(endpoint) {
        const url = `${this.baseURL}${endpoint}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    }
}

const api = new ApiService('https://jsonplaceholder.typicode.com');
// Функция, которая получает данные и отрисовывает их
async function fetchAndRenderUsers() {
    const loader = document.getElementById('loader');
    const container = document.getElementById('usersContainer');

    try {
        loader.style.display = 'block';
        container.innerHTML = '';

        const users = await api.get('/users');
        loader.style.display = 'none';

        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'user-card';
            card.innerHTML = `
                <h3>${user.name}</h3>
                <p>📧 ${user.email}</p>
                <p>📍 ${user.address.city}</p>
                <div class="posts-container" id="posts-${user.id}" style="display:none; margin-top:10px;"></div>
            `;
            
            // Обработчик клика по карточке
            card.addEventListener('click', async () => {
                const postsContainer = document.getElementById(`posts-${user.id}`);
                
                // Если посты уже загружены и видны — просто скрываем
                if (postsContainer.style.display === 'block') {
                    postsContainer.style.display = 'none';
                    return;
                }
                
                // Если контейнер пуст, загружаем посты
                if (postsContainer.children.length === 0) {
                    postsContainer.innerHTML = '<p style="color:#3498db;">Загрузка постов...</p>';
                    postsContainer.style.display = 'block';
                    
                    try {
                        const posts = await api.get(`/posts?userId=${user.id}`);
                        postsContainer.innerHTML = ''; // очищаем сообщение о загрузке
                        
                        if (posts.length === 0) {
                            postsContainer.innerHTML = '<p>У этого пользователя нет постов</p>';
                        } else {
                            posts.forEach(post => {
                                const postDiv = document.createElement('div');
                                postDiv.className = 'post-item';
                                postDiv.innerHTML = `
                                    <h4>${post.title}</h4>
                                    <p>${post.body}</p>
                                `;
                                postsContainer.appendChild(postDiv);
                            });
                        }
                    } catch (error) {
                        postsContainer.innerHTML = `<p class="error">❌ Ошибка загрузки постов: ${error.message}</p>`;
                    }
                } else {
                    // Если посты уже были загружены ранее, просто показываем
                    postsContainer.style.display = 'block';
                }
            });
            
            container.appendChild(card);
        });

    } catch (error) {
        loader.style.display = 'none';
        container.innerHTML = `<p class="error">❌ ${error.message}</p>`;
        console.error(error);
    }
}

// Запускаем загрузку при открытии страницы
fetchAndRenderUsers();