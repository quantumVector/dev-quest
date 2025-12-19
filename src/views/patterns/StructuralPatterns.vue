<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-typescript.js'

const adapterSnippet = `
// ADAPTER - адаптация интерфейсов

// Старая библиотека
class OldLogger {
  logMessage(message: string) {
    console.log(\`[OLD] \${message}\`);
  }
}

// Новый интерфейс логирования
interface ModernLogger {
  log(level: string, message: string): void;
  error(message: string): void;
  warn(message: string): void;
}

// Адаптер для старой библиотеки
class LoggerAdapter implements ModernLogger {
  private oldLogger: OldLogger;

  constructor(oldLogger: OldLogger) {
    this.oldLogger = oldLogger;
  }

  log(level: string, message: string): void {
    this.oldLogger.logMessage(\`[\${level}] \${message}\`);
  }

  error(message: string): void {
    this.oldLogger.logMessage(\`[ERROR] \${message}\`);
  }

  warn(message: string): void {
    this.oldLogger.logMessage(\`[WARN] \${message}\`);
  }
}

// Использование
const oldLogger = new OldLogger();
const adapter = new LoggerAdapter(oldLogger);

adapter.log('INFO', 'Application started');
adapter.error('Failed to load data');
adapter.warn('Deprecated API usage');
`

const adapterReactSnippet = `
// Adapter в React - адаптация сторонних библиотек

// Старая библиотека графиков
interface OldChartLibrary {
  drawChart(elementId: string, data: number[]): void;
}

// Современный React компонент
interface ChartProps {
  data: Array<{ label: string; value: number }>;
  type: 'line' | 'bar';
}

// Адаптер для React
function ChartAdapter({ data, type }: ChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Адаптируем данные для старой библиотеки
    const adaptedData = data.map(item => item.value);
    const oldLib = new OldChartLibrary();

    oldLib.drawChart(chartRef.current.id, adaptedData);
  }, [data]);

  return <div ref={chartRef} id="chart-container" />;
}

// Использование в приложении
function App() {
  const modernData = [
    { label: 'Jan', value: 100 },
    { label: 'Feb', value: 150 },
    { label: 'Mar', value: 200 }
  ];

  return <ChartAdapter data={modernData} type="line" />;
}
`

const decoratorSnippet = `
// DECORATOR - динамическое добавление функциональности

// Базовый компонент
interface DataService {
  fetchData(): Promise<any>;
}

class BasicDataService implements DataService {
  async fetchData() {
    const response = await fetch('/api/data');
    return response.json();
  }
}

// Декораторы
class CachingDecorator implements DataService {
  private service: DataService;
  private cache = new Map<string, any>();

  constructor(service: DataService) {
    this.service = service;
  }

  async fetchData() {
    const cacheKey = 'data';

    if (this.cache.has(cacheKey)) {
      console.log('Returning cached data');
      return this.cache.get(cacheKey);
    }

    const data = await this.service.fetchData();
    this.cache.set(cacheKey, data);
    return data;
  }
}

class LoggingDecorator implements DataService {
  private service: DataService;

  constructor(service: DataService) {
    this.service = service;
  }

  async fetchData() {
    console.log('Fetching data...');
    const startTime = Date.now();

    const data = await this.service.fetchData();

    const endTime = Date.now();
    console.log(\`Data fetched in \${endTime - startTime}ms\`);

    return data;
  }
}

class ErrorHandlingDecorator implements DataService {
  private service: DataService;

  constructor(service: DataService) {
    this.service = service;
  }

  async fetchData() {
    try {
      return await this.service.fetchData();
    } catch (error) {
      console.error('Failed to fetch data:', error);
      return { error: 'Failed to load data' };
    }
  }
}

// Композиция декораторов
let service: DataService = new BasicDataService();
service = new CachingDecorator(service);
service = new LoggingDecorator(service);
service = new ErrorHandlingDecorator(service);

// Теперь сервис имеет кэширование, логирование и обработку ошибок
service.fetchData();
`

const decoratorReactSnippet = `
// Decorator в React - HOC (Higher-Order Components)

// Базовый компонент
interface UserProfileProps {
  user: { name: string; email: string };
}

function UserProfile({ user }: UserProfileProps) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// Декоратор для загрузки данных
function withDataFetching<P extends object>(
  Component: React.ComponentType<P>,
  fetchData: () => Promise<any>
) {
  return function WithDataFetching(props: Omit<P, 'user'>) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchData()
        .then(setData)
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!data) return <div>No data</div>;

    return <Component {...(props as P)} user={data} />;
  };
}

// Декоратор для аналитики
function withAnalytics<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithAnalytics(props: P) {
    useEffect(() => {
      console.log('Component mounted:', Component.name);

      return () => {
        console.log('Component unmounted:', Component.name);
      };
    }, []);

    return <Component {...props} />;
  };
}

// Композиция декораторов
const fetchUser = () => fetch('/api/user').then(r => r.json());

const EnhancedUserProfile = withAnalytics(
  withDataFetching(UserProfile, fetchUser)
);

// Использование
function App() {
  return <EnhancedUserProfile />;
}
`

const facadeSnippet = `
// FACADE - упрощенный интерфейс для сложной системы

// Сложная подсистема аутентификации
class AuthService {
  validateCredentials(email: string, password: string) {
    // сложная логика
    return { valid: true, userId: '123' };
  }
}

class TokenService {
  generateToken(userId: string) {
    return \`token_\${userId}_\${Date.now()}\`;
  }

  validateToken(token: string) {
    return token.startsWith('token_');
  }
}

class SessionService {
  createSession(userId: string, token: string) {
    localStorage.setItem('session', JSON.stringify({ userId, token }));
  }

  getSession() {
    const data = localStorage.getItem('session');
    return data ? JSON.parse(data) : null;
  }

  clearSession() {
    localStorage.removeItem('session');
  }
}

class PermissionService {
  loadPermissions(userId: string) {
    return ['read', 'write'];
  }
}

// Фасад для упрощения работы
class AuthFacade {
  private authService = new AuthService();
  private tokenService = new TokenService();
  private sessionService = new SessionService();
  private permissionService = new PermissionService();

  async login(email: string, password: string) {
    // Упрощенный интерфейс для сложной операции
    const validation = this.authService.validateCredentials(email, password);

    if (!validation.valid) {
      throw new Error('Invalid credentials');
    }

    const token = this.tokenService.generateToken(validation.userId);
    this.sessionService.createSession(validation.userId, token);
    const permissions = this.permissionService.loadPermissions(validation.userId);

    return {
      userId: validation.userId,
      token,
      permissions
    };
  }

  logout() {
    this.sessionService.clearSession();
  }

  isAuthenticated() {
    const session = this.sessionService.getSession();
    if (!session) return false;
    return this.tokenService.validateToken(session.token);
  }

  getCurrentUser() {
    const session = this.sessionService.getSession();
    if (!session) return null;

    return {
      userId: session.userId,
      permissions: this.permissionService.loadPermissions(session.userId)
    };
  }
}

// Простое использование
const auth = new AuthFacade();

// Вместо вызова 4+ методов разных сервисов
await auth.login('user@example.com', 'password123');

// Проверка авторизации
if (auth.isAuthenticated()) {
  const user = auth.getCurrentUser();
  console.log('Current user:', user);
}
`

const facadeReactSnippet = `
// Facade в React - упрощение работы с API и состоянием

// Сложное API приложения
class UserAPI {
  fetchUser(id: string) { /* ... */ }
  updateUser(id: string, data: any) { /* ... */ }
}

class PostsAPI {
  fetchUserPosts(userId: string) { /* ... */ }
  createPost(userId: string, content: string) { /* ... */ }
}

class NotificationAPI {
  fetchNotifications(userId: string) { /* ... */ }
  markAsRead(notificationId: string) { /* ... */ }
}

// Фасад для React
function useUserData(userId: string) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const userAPI = useMemo(() => new UserAPI(), []);
  const postsAPI = useMemo(() => new PostsAPI(), []);
  const notificationAPI = useMemo(() => new NotificationAPI(), []);

  useEffect(() => {
    async function loadAllData() {
      setLoading(true);
      try {
        // Фасад скрывает сложность параллельной загрузки
        const [userData, userPosts, userNotifications] = await Promise.all([
          userAPI.fetchUser(userId),
          postsAPI.fetchUserPosts(userId),
          notificationAPI.fetchNotifications(userId)
        ]);

        setUser(userData);
        setPosts(userPosts);
        setNotifications(userNotifications);
      } finally {
        setLoading(false);
      }
    }

    loadAllData();
  }, [userId]);

  // Упрощенные методы для работы с данными
  const createPost = async (content: string) => {
    const newPost = await postsAPI.createPost(userId, content);
    setPosts(prev => [newPost, ...prev]);
  };

  const markNotificationAsRead = async (id: string) => {
    await notificationAPI.markAsRead(id);
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return {
    user,
    posts,
    notifications,
    loading,
    createPost,
    markNotificationAsRead
  };
}

// Простое использование в компоненте
function UserDashboard({ userId }: { userId: string }) {
  // Один хук вместо 3+ API вызовов
  const { user, posts, notifications, loading, createPost } = useUserData(userId);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <UserProfile user={user} />
      <PostsList posts={posts} onCreatePost={createPost} />
      <NotificationsList notifications={notifications} />
    </div>
  );
}
`

const proxySnippet = `
// PROXY - контроль доступа к объекту

// Реальный сервис
class ExpensiveDataService {
  loadData() {
    console.log('Loading expensive data...');
    // Симуляция тяжелой операции
    return { data: 'Heavy data', size: '100MB' };
  }
}

// Прокси с ленивой инициализацией
class LazyDataServiceProxy {
  private realService: ExpensiveDataService | null = null;

  loadData() {
    // Создаем реальный объект только при первом обращении
    if (!this.realService) {
      console.log('Initializing real service...');
      this.realService = new ExpensiveDataService();
    }

    return this.realService.loadData();
  }
}

// Прокси с кэшированием
class CachingProxy {
  private realService = new ExpensiveDataService();
  private cache: any = null;
  private cacheExpiry: number = 0;

  loadData() {
    const now = Date.now();

    if (this.cache && now < this.cacheExpiry) {
      console.log('Returning cached data');
      return this.cache;
    }

    console.log('Cache expired, loading fresh data');
    this.cache = this.realService.loadData();
    this.cacheExpiry = now + 60000; // 1 минута

    return this.cache;
  }
}

// Прокси с контролем доступа
class AccessControlProxy {
  private realService = new ExpensiveDataService();
  private currentUser: { role: string };

  constructor(user: { role: string }) {
    this.currentUser = user;
  }

  loadData() {
    if (this.currentUser.role !== 'admin') {
      throw new Error('Access denied: insufficient permissions');
    }

    console.log('Access granted');
    return this.realService.loadData();
  }
}

// Использование
const lazyProxy = new LazyDataServiceProxy();
console.log('Proxy created, service not initialized yet');
lazyProxy.loadData(); // Инициализация происходит здесь

const cachingProxy = new CachingProxy();
cachingProxy.loadData(); // Загрузка данных
cachingProxy.loadData(); // Из кэша

const accessProxy = new AccessControlProxy({ role: 'admin' });
accessProxy.loadData(); // Успех
`

const proxyReactSnippet = `
// Proxy в React - виртуальный скроллинг и lazy loading

// Прокси для виртуализации больших списков
function VirtualizedListProxy({ items }: { items: any[] }) {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const scrollTop = containerRef.current.scrollTop;
    const itemHeight = 50;
    const start = Math.floor(scrollTop / itemHeight);
    const end = start + 50;

    setVisibleRange({ start, end });
  }, []);

  // Прокси показывает только видимые элементы
  const visibleItems = items.slice(visibleRange.start, visibleRange.end);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{ height: '500px', overflow: 'auto' }}
    >
      <div style={{ height: items.length * 50 }}>
        <div style={{ transform: \`translateY(\${visibleRange.start * 50}px)\` }}>
          {visibleItems.map((item, index) => (
            <div key={visibleRange.start + index} style={{ height: 50 }}>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Прокси для ленивой загрузки изображений
function LazyImageProxy({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={visible ? src : 'data:image/svg+xml,...'} // placeholder
      alt={alt}
      onLoad={() => setLoaded(true)}
      style={{ opacity: loaded ? 1 : 0.5 }}
    />
  );
}
`

const compositeSnippet = `
// COMPOSITE - древовидные структуры

// Общий интерфейс для компонентов
interface FileSystemComponent {
  getName(): string;
  getSize(): number;
  display(indent: string): void;
}

// Лист - файл (не имеет детей)
class File implements FileSystemComponent {
  constructor(
    private name: string,
    private size: number
  ) {}

  getName() {
    return this.name;
  }

  getSize() {
    return this.size;
  }

  display(indent = '') {
    console.log(\`\${indent}📄 \${this.name} (\${this.size}KB)\`);
  }
}

// Композит - папка (может содержать файлы и другие папки)
class Folder implements FileSystemComponent {
  private children: FileSystemComponent[] = [];

  constructor(private name: string) {}

  add(component: FileSystemComponent) {
    this.children.push(component);
  }

  remove(component: FileSystemComponent) {
    const index = this.children.indexOf(component);
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }

  getName() {
    return this.name;
  }

  getSize() {
    // Рекурсивно суммируем размеры всех детей
    return this.children.reduce(
      (total, child) => total + child.getSize(),
      0
    );
  }

  display(indent = '') {
    console.log(\`\${indent}📁 \${this.name} (\${this.getSize()}KB)\`);

    // Рекурсивно отображаем детей
    this.children.forEach(child => {
      child.display(indent + '  ');
    });
  }
}

// Построение иерархии
const root = new Folder('root');

const documents = new Folder('documents');
documents.add(new File('resume.pdf', 150));
documents.add(new File('cover-letter.docx', 50));

const photos = new Folder('photos');
photos.add(new File('vacation.jpg', 2000));
photos.add(new File('family.jpg', 1500));

const work = new Folder('work');
work.add(new File('project.pptx', 5000));
work.add(documents);

root.add(work);
root.add(photos);

// Одинаковый интерфейс для файлов и папок
root.display();
console.log(\`Total size: \${root.getSize()}KB\`);
`

const compositeReactSnippet = `
// Composite в React - древовидные компоненты

// Интерфейс для элементов меню
interface MenuItem {
  id: string;
  label: string;
  children?: MenuItem[];
  onClick?: () => void;
}

// Компонент для листа (элемент без детей)
function MenuLeaf({ item }: { item: MenuItem }) {
  return (
    <li className="menu-item">
      <button onClick={item.onClick}>
        {item.label}
      </button>
    </li>
  );
}

// Компонент для композита (элемент с детьми)
function MenuComposite({ item }: { item: MenuItem }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="menu-item">
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? '▼' : '▶'} {item.label}
      </button>

      {expanded && item.children && (
        <ul className="submenu">
          {item.children.map(child => (
            <MenuComponent key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

// Единый компонент, который решает, что рендерить
function MenuComponent({ item }: { item: MenuItem }) {
  const hasChildren = item.children && item.children.length > 0;

  return hasChildren ? (
    <MenuComposite item={item} />
  ) : (
    <MenuLeaf item={item} />
  );
}

// Использование
function Menu() {
  const menuStructure: MenuItem[] = [
    {
      id: '1',
      label: 'File',
      children: [
        { id: '1-1', label: 'New', onClick: () => console.log('New') },
        { id: '1-2', label: 'Open', onClick: () => console.log('Open') },
        {
          id: '1-3',
          label: 'Recent',
          children: [
            { id: '1-3-1', label: 'Doc1.txt', onClick: () => {} },
            { id: '1-3-2', label: 'Doc2.txt', onClick: () => {} }
          ]
        }
      ]
    },
    {
      id: '2',
      label: 'Edit',
      children: [
        { id: '2-1', label: 'Cut', onClick: () => console.log('Cut') },
        { id: '2-2', label: 'Copy', onClick: () => console.log('Copy') }
      ]
    }
  ];

  return (
    <nav>
      <ul className="menu">
        {menuStructure.map(item => (
          <MenuComponent key={item.id} item={item} />
        ))}
      </ul>
    </nav>
  );
}
`

const bridgeSnippet = `
// BRIDGE - разделение абстракции и реализации

// Реализация (платформа)
interface MessageSender {
  sendMessage(message: string, recipient: string): void;
}

class EmailSender implements MessageSender {
  sendMessage(message: string, recipient: string) {
    console.log(\`Sending email to \${recipient}: \${message}\`);
    // Реальная отправка email
  }
}

class SMSSender implements MessageSender {
  sendMessage(message: string, recipient: string) {
    console.log(\`Sending SMS to \${recipient}: \${message}\`);
    // Реальная отправка SMS
  }

class PushNotificationSender implements MessageSender {
  sendMessage(message: string, recipient: string) {
    console.log(\`Sending push to \${recipient}: \${message}\`);
    // Реальная отправка push
  }
}

// Абстракция (типы сообщений)
abstract class Notification {
  protected sender: MessageSender;

  constructor(sender: MessageSender) {
    this.sender = sender;
  }

  abstract send(recipient: string): void;
}

class AlertNotification extends Notification {
  private alertMessage: string;

  constructor(sender: MessageSender, message: string) {
    super(sender);
    this.alertMessage = message;
  }

  send(recipient: string) {
    this.sender.sendMessage(
      \`🚨 ALERT: \${this.alertMessage}\`,
      recipient
    );
  }
}

class WelcomeNotification extends Notification {
  private userName: string;

  constructor(sender: MessageSender, userName: string) {
    super(sender);
    this.userName = userName;
  }

  send(recipient: string) {
    this.sender.sendMessage(
      \`Welcome, \${this.userName}! 👋\`,
      recipient
    );
  }
}

// Использование - комбинируем абстракции и реализации
const emailAlert = new AlertNotification(
  new EmailSender(),
  'Server is down'
);
emailAlert.send('admin@example.com');

const smsAlert = new AlertNotification(
  new SMSSender(),
  'Server is down'
);
smsAlert.send('+1234567890');

const pushWelcome = new WelcomeNotification(
  new PushNotificationSender(),
  'John'
);
pushWelcome.send('user123');
`

const bridgeReactSnippet = `
// Bridge в React - разделение UI и бизнес-логики

// Реализация (API провайдеры)
interface DataProvider {
  fetchData(): Promise<any>;
  updateData(data: any): Promise<void>;
}

class RESTProvider implements DataProvider {
  async fetchData() {
    const response = await fetch('/api/data');
    return response.json();
  }

  async updateData(data: any) {
    await fetch('/api/data', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
}

class GraphQLProvider implements DataProvider {
  async fetchData() {
    const query = '{ data { id name } }';
    const response = await fetch('/graphql', {
      method: 'POST',
      body: JSON.stringify({ query })
    });
    return response.json();
  }

  async updateData(data: any) {
    const mutation = \`mutation { updateData(input: ...) }\`;
    await fetch('/graphql', {
      method: 'POST',
      body: JSON.stringify({ query: mutation })
    });
  }
}

class MockProvider implements DataProvider {
  async fetchData() {
    return { id: 1, name: 'Mock Data' };
  }

  async updateData(data: any) {
    console.log('Mock update:', data);
  }
}

// Абстракция (хук для работы с данными)
function useData(provider: DataProvider) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    provider.fetchData()
      .then(setData)
      .finally(() => setLoading(false));
  }, [provider]);

  const update = async (newData: any) => {
    await provider.updateData(newData);
    setData(newData);
  };

  return { data, loading, update };
}

// Использование - легко переключаемся между провайдерами
function App() {
  // Меняем провайдер в зависимости от окружения
  const provider = process.env.NODE_ENV === 'test'
    ? new MockProvider()
    : new RESTProvider();

  const { data, loading, update } = useData(provider);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data?.name}</h1>
      <button onClick={() => update({ ...data, name: 'Updated' })}>
        Update
      </button>
    </div>
  );
}
`

const flyweightSnippet = `
// FLYWEIGHT - эффективное использование памяти

// Внутреннее состояние (разделяемое)
class TreeType {
  constructor(
    public name: string,
    public color: string,
    public texture: string
  ) {}

  draw(x: number, y: number) {
    console.log(\`Drawing \${this.name} tree at (\${x}, \${y})\`);
    // Использует разделяемые ресурсы: color, texture
  }
}

// Фабрика для переиспользования объектов
class TreeFactory {
  private static treeTypes = new Map<string, TreeType>();

  static getTreeType(name: string, color: string, texture: string): TreeType {
    const key = \`\${name}_\${color}_\${texture}\`;

    if (!this.treeTypes.has(key)) {
      console.log(\`Creating new tree type: \${key}\`);
      this.treeTypes.set(key, new TreeType(name, color, texture));
    }

    return this.treeTypes.get(key)!;
  }

  static getTotalTypes() {
    return this.treeTypes.size;
  }
}

// Внешнее состояние (уникальное для каждого объекта)
class Tree {
  constructor(
    private x: number,
    private y: number,
    private treeType: TreeType
  ) {}

  draw() {
    this.treeType.draw(this.x, this.y);
  }
}

// Лес из тысяч деревьев
class Forest {
  private trees: Tree[] = [];

  plantTree(x: number, y: number, name: string, color: string, texture: string) {
    const type = TreeFactory.getTreeType(name, color, texture);
    const tree = new Tree(x, y, type);
    this.trees.push(tree);
  }

  draw() {
    this.trees.forEach(tree => tree.draw());
  }
}

// Использование
const forest = new Forest();

// Садим 10000 деревьев, но создаем только 3 типа!
for (let i = 0; i < 10000; i++) {
  const types = [
    ['Oak', 'green', 'oak.png'],
    ['Pine', 'dark-green', 'pine.png'],
    ['Birch', 'white', 'birch.png']
  ];

  const [name, color, texture] = types[i % 3];
  forest.plantTree(
    Math.random() * 1000,
    Math.random() * 1000,
    name,
    color,
    texture
  );
}

console.log(\`Trees planted: 10000\`);
console.log(\`Unique tree types: \${TreeFactory.getTotalTypes()}\`); // 3
forest.draw();
`

const flyweightReactSnippet = `
// Flyweight в React - оптимизация рендеринга больших списков

// Внутреннее состояние (разделяемое)
interface CellStyle {
  backgroundColor: string;
  textColor: string;
  fontSize: number;
}

const cellStyleFactory = (() => {
  const styles = new Map<string, CellStyle>();

  return {
    getStyle(bg: string, text: string, size: number): CellStyle {
      const key = \`\${bg}_\${text}_\${size}\`;

      if (!styles.has(key)) {
        styles.set(key, {
          backgroundColor: bg,
          textColor: text,
          fontSize: size
        });
      }

      return styles.get(key)!;
    },
    getCount: () => styles.size
  };
})();

// Компонент ячейки с переиспользуемым стилем
const Cell = memo(({
  x,
  y,
  value,
  style
}: {
  x: number;
  y: number;
  value: string;
  style: CellStyle;
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x * 100,
        top: y * 50,
        width: 100,
        height: 50,
        ...style
      }}
    >
      {value}
    </div>
  );
});

// Большая таблица с переиспользованием стилей
function SpreadsheetGrid() {
  const rows = 1000;
  const cols = 100;

  // Только 3 разных стиля для 100,000 ячеек!
  const headerStyle = cellStyleFactory.getStyle('#333', '#fff', 14);
  const evenStyle = cellStyleFactory.getStyle('#fff', '#000', 12);
  const oddStyle = cellStyleFactory.getStyle('#f5f5f5', '#000', 12);

  const cells = useMemo(() => {
    const result = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const isHeader = row === 0;
        const style = isHeader
          ? headerStyle
          : (row % 2 === 0 ? evenStyle : oddStyle);

        result.push(
          <Cell
            key={\`\${row}-\${col}\`}
            x={col}
            y={row}
            value={\`\${row},\${col}\`}
            style={style}
          />
        );
      }
    }

    return result;
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {cells}
      <div style={{ position: 'fixed', top: 10, right: 10 }}>
        Total cells: {rows * cols}<br/>
        Unique styles: {cellStyleFactory.getCount()}
      </div>
    </div>
  );
}
`

const highlightedAdapter = ref('')
const highlightedAdapterReact = ref('')
const highlightedDecorator = ref('')
const highlightedDecoratorReact = ref('')
const highlightedFacade = ref('')
const highlightedFacadeReact = ref('')
const highlightedProxy = ref('')
const highlightedProxyReact = ref('')
const highlightedComposite = ref('')
const highlightedCompositeReact = ref('')
const highlightedBridge = ref('')
const highlightedBridgeReact = ref('')
const highlightedFlyweight = ref('')
const highlightedFlyweightReact = ref('')

onMounted(() => {
  highlightedAdapter.value = Prism.highlight(adapterSnippet, Prism.languages.typescript, 'typescript')
  highlightedAdapterReact.value = Prism.highlight(adapterReactSnippet, Prism.languages.typescript, 'typescript')
  highlightedDecorator.value = Prism.highlight(decoratorSnippet, Prism.languages.typescript, 'typescript')
  highlightedDecoratorReact.value = Prism.highlight(decoratorReactSnippet, Prism.languages.typescript, 'typescript')
  highlightedFacade.value = Prism.highlight(facadeSnippet, Prism.languages.typescript, 'typescript')
  highlightedFacadeReact.value = Prism.highlight(facadeReactSnippet, Prism.languages.typescript, 'typescript')
  highlightedProxy.value = Prism.highlight(proxySnippet, Prism.languages.typescript, 'typescript')
  highlightedProxyReact.value = Prism.highlight(proxyReactSnippet, Prism.languages.typescript, 'typescript')
  highlightedComposite.value = Prism.highlight(compositeSnippet, Prism.languages.typescript, 'typescript')
  highlightedCompositeReact.value = Prism.highlight(compositeReactSnippet, Prism.languages.typescript, 'typescript')
  highlightedBridge.value = Prism.highlight(bridgeSnippet, Prism.languages.typescript, 'typescript')
  highlightedBridgeReact.value = Prism.highlight(bridgeReactSnippet, Prism.languages.typescript, 'typescript')
  highlightedFlyweight.value = Prism.highlight(flyweightSnippet, Prism.languages.typescript, 'typescript')
  highlightedFlyweightReact.value = Prism.highlight(flyweightReactSnippet, Prism.languages.typescript, 'typescript')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Структурные паттерны проектирования
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Структурные паттерны</b> описывают способы компоновки объектов и классов в более крупные структуры,
              сохраняя при этом гибкость и эффективность. Они помогают организовать связи между компонентами системы.
              Рассмотрим 7 основных структурных паттернов с примерами для фронтенд-разработки.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Обзор структурных паттернов</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Паттерн</th>
                <th class="text-left font-weight-bold">Назначение</th>
                <th class="text-left font-weight-bold">Когда использовать</th>
                <th class="text-left font-weight-bold">Пример в UI</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Adapter</b></td>
                <td>Адаптация несовместимых интерфейсов</td>
                <td>Интеграция сторонних библиотек</td>
                <td>Обертка старой библиотеки</td>
              </tr>
              <tr>
                <td><b>Decorator</b></td>
                <td>Динамическое добавление функций</td>
                <td>Расширение без изменения кода</td>
                <td>HOC в React</td>
              </tr>
              <tr>
                <td><b>Facade</b></td>
                <td>Упрощение сложного интерфейса</td>
                <td>Множество зависимых операций</td>
                <td>Кастомные хуки</td>
              </tr>
              <tr>
                <td><b>Proxy</b></td>
                <td>Контроль доступа к объекту</td>
                <td>Ленивая загрузка, кэширование</td>
                <td>Виртуальный скроллинг</td>
              </tr>
              <tr>
                <td><b>Composite</b></td>
                <td>Древовидные структуры</td>
                <td>Иерархии объектов</td>
                <td>Вложенное меню</td>
              </tr>
              <tr>
                <td><b>Bridge</b></td>
                <td>Разделение абстракции и реализации</td>
                <td>Независимое изменение частей</td>
                <td>Разные API провайдеры</td>
              </tr>
              <tr>
                <td><b>Flyweight</b></td>
                <td>Экономия памяти</td>
                <td>Множество однотипных объектов</td>
                <td>Большие таблицы/списки</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">1. Adapter (Адаптер)</h2>
            <p class="font-weight-regular mb-4">
              <b>Проблема:</b> Нужно использовать класс с несовместимым интерфейсом.<br>
              <b>Решение:</b> Создать класс-адаптер, преобразующий интерфейс.
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="highlightedAdapter"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Adapter в React</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAdapterReact"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. Decorator (Декоратор)</h2>
            <p class="font-weight-regular mb-4">
              <b>Проблема:</b> Нужно динамически добавлять функциональность без изменения кода.<br>
              <b>Решение:</b> Создать обертки, добавляющие поведение.
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="highlightedDecorator"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Decorator в React (HOC)</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDecoratorReact"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. Facade (Фасад)</h2>
            <p class="font-weight-regular mb-4">
              <b>Проблема:</b> Сложная система с множеством взаимосвязанных компонентов.<br>
              <b>Решение:</b> Единый упрощенный интерфейс для работы с подсистемами.
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="highlightedFacade"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Facade в React (Custom Hooks)</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedFacadeReact"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">4. Proxy (Прокси)</h2>
            <p class="font-weight-regular mb-4">
              <b>Проблема:</b> Нужен контроль доступа к объекту или отложенная инициализация.<br>
              <b>Решение:</b> Прокси-объект контролирует обращения к реальному объекту.
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="highlightedProxy"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Proxy в React (Виртуализация)</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedProxyReact"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">5. Composite (Компоновщик)</h2>
            <p class="font-weight-regular mb-4">
              <b>Проблема:</b> Нужно работать с древовидными структурами единообразно.<br>
              <b>Решение:</b> Единый интерфейс для листьев и композитных объектов.
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="highlightedComposite"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Composite в React (Меню)</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCompositeReact"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">6. Bridge (Мост)</h2>
            <p class="font-weight-regular mb-4">
              <b>Проблема:</b> Тесная связь между абстракцией и реализацией.<br>
              <b>Решение:</b> Разделить абстракцию и реализацию в независимые иерархии.
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="highlightedBridge"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Bridge в React (API провайдеры)</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBridgeReact"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">7. Flyweight (Приспособленец)</h2>
            <p class="font-weight-regular mb-4">
              <b>Проблема:</b> Много однотипных объектов потребляют память.<br>
              <b>Решение:</b> Разделять общее состояние между объектами.
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="highlightedFlyweight"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Flyweight в React (Оптимизация)</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedFlyweightReact"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение паттернов</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Изменение интерфейса</h3>
                  <ul class="pl-4">
                    <li><b>Adapter</b> — преобразует интерфейс</li>
                    <li><b>Facade</b> — упрощает интерфейс</li>
                    <li><b>Proxy</b> — сохраняет интерфейс, добавляет контроль</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Добавление функциональности</h3>
                  <ul class="pl-4">
                    <li><b>Decorator</b> — добавляет поведение динамически</li>
                    <li><b>Proxy</b> — контролирует доступ</li>
                    <li><b>Bridge</b> — разделяет абстракцию и реализацию</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Работа со структурами</h3>
                  <ul class="pl-4">
                    <li><b>Composite</b> — древовидные иерархии</li>
                    <li><b>Flyweight</b> — экономия памяти</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Упрощение сложности</h3>
                  <ul class="pl-4">
                    <li><b>Facade</b> — единый интерфейс к подсистемам</li>
                    <li><b>Proxy</b> — отложенная инициализация</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между Adapter и Facade?</p>
                <p class="font-weight-regular ma-0">
                  <b>Adapter</b> преобразует один интерфейс в другой для совместимости.
                  <b>Facade</b> предоставляет упрощенный интерфейс к сложной подсистеме.
                  Adapter работает с существующим классом, Facade создает новый интерфейс для группы классов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Чем Decorator отличается от Proxy?</p>
                <p class="font-weight-regular ma-0">
                  <b>Decorator</b> добавляет новую функциональность, расширяя объект.
                  <b>Proxy</b> контролирует доступ к объекту (кэширование, ленивая загрузка, контроль доступа).
                  Decorator изменяет поведение, Proxy управляет использованием.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать Composite в React?</p>
                <p class="font-weight-regular ma-0">
                  Используйте Composite для древовидных структур: меню, файловые системы, комментарии с ответами,
                  организационные структуры. Когда нужен единый интерфейс для работы с листьями и контейнерами.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как Bridge помогает в тестировании?</p>
                <p class="font-weight-regular ma-0">
                  Bridge разделяет абстракцию (бизнес-логику) и реализацию (API, хранилище).
                  Это позволяет легко подменять реализацию на mock-объекты для тестирования,
                  не изменяя код компонентов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Где применяется Flyweight в современном фронтенде?</p>
                <p class="font-weight-regular ma-0">
                  Виртуальный скроллинг (react-window, react-virtualized), большие таблицы,
                  canvas-приложения с множеством объектов, текстовые редакторы.
                  Везде, где много похожих объектов и важна производительность.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли комбинировать структурные паттерны?</p>
                <p class="font-weight-regular ma-0">
                  Да! Часто используют: Facade + Adapter (упрощение адаптированной библиотеки),
                  Decorator + Composite (декорирование древовидных структур),
                  Proxy + Flyweight (ленивая загрузка разделяемых объектов).
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики применения</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Рекомендуется</h3>
                  <ul class="text-left pl-4">
                    <li>Adapter для интеграции библиотек</li>
                    <li>Facade для сложных API</li>
                    <li>HOC как Decorator в React</li>
                    <li>Composite для рекурсивных структур</li>
                    <li>Flyweight для больших списков</li>
                    <li>Proxy для виртуализации</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Избыточное использование паттернов</li>
                    <li>Глубокая вложенность декораторов</li>
                    <li>Facade для простых операций</li>
                    <li>Proxy без реальной необходимости</li>
                    <li>Flyweight для малого числа объектов</li>
                    <li>Bridge там, где достаточно простого интерфейса</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Начинайте с простых решений</li>
                    <li>Применяйте паттерны по мере роста</li>
                    <li>Документируйте использование паттернов</li>
                    <li>Тестируйте каждый слой отдельно</li>
                    <li>Профилируйте производительность</li>
                    <li>Рефакторите постепенно</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Структурные паттерны</b> помогают организовать связи между объектами эффективно и гибко.
              <b>Adapter, Decorator, Facade</b> — самые частые в React.
              <b>Proxy и Flyweight</b> — для оптимизации производительности.
              <b>Composite</b> — для древовидных структур.
              <b>Bridge</b> — для разделения абстракции и реализации.
              Выбирайте паттерн в зависимости от конкретной проблемы, избегайте избыточной сложности.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://refactoring.guru/design-patterns/structural-patterns"
                target="_blank"
                class="mr-2">
                Refactoring Guru
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://www.patterns.dev/posts/classic-design-patterns"
                target="_blank">
                Patterns.dev
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.custom-code {
  color: #f8f8f2;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.5;
  overflow-x: auto;
  white-space: pre;
}
</style>
