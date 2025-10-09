import { useState } from 'react'
import './App.css'

// 商品データ
const products = [
  { id: 1, name: 'ノートパソコン', price: 89800, description: '高性能なノートパソコン', emoji: '💻' },
  { id: 2, name: 'ワイヤレスマウス', price: 2980, description: '快適な操作性', emoji: '🖱️' },
  { id: 3, name: 'キーボード', price: 5980, description: 'メカニカルキーボード', emoji: '⌨️' },
  { id: 4, name: 'モニター', price: 24800, description: '27インチ4Kモニター', emoji: '🖥️' },
  { id: 5, name: 'ヘッドフォン', price: 12800, description: 'ノイズキャンセリング機能付き', emoji: '🎧' },
  { id: 6, name: 'Webカメラ', price: 8900, description: 'フルHD対応', emoji: '📷' },
  { id: 7, name: 'スマートフォン', price: 78000, description: '最新モデル', emoji: '📱' },
  { id: 8, name: 'タブレット', price: 45000, description: '10インチディスプレイ', emoji: '📲' },
  { id: 9, name: 'スマートウォッチ', price: 32000, description: '健康管理機能付き', emoji: '⌚' },
  { id: 10, name: 'ワイヤレスイヤホン', price: 18000, description: 'アクティブノイズキャンセリング', emoji: '🎵' },
  { id: 11, name: 'プリンター', price: 15800, description: '多機能プリンター', emoji: '🖨️' },
  { id: 12, name: 'USBメモリ', price: 1980, description: '64GB高速転送', emoji: '💾' },
  { id: 13, name: '外付けHDD', price: 9800, description: '2TB大容量', emoji: '💿' },
  { id: 14, name: 'ゲームコントローラー', price: 6800, description: 'ワイヤレス対応', emoji: '🎮' },
  { id: 15, name: 'スピーカー', price: 22000, description: 'Bluetooth対応', emoji: '🔊' }
];

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [message, setMessage] = useState('');

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    setMessage(`${product.emoji} ${product.name}をカートに追加しました`);
    setTimeout(() => setMessage(''), 2000);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const checkout = () => {
    setCart([]);
    setShowCart(false);
    setMessage('購入が完了しました！ありがとうございます。');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="container">
      <header>
        <h1>ECサイト</h1>
        <button className="cart-button" onClick={() => setShowCart(!showCart)}>
          🛒 カート ({cartCount})
        </button>
      </header>

      {message && <div className="message">{message}</div>}

      {!showCart ? (
        <div className="products-page">
          <h2>商品一覧</h2>
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">{product.emoji}</div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">¥{product.price.toLocaleString()}</p>
                <button className="btn-primary" onClick={() => addToCart(product)}>
                  カートに追加
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="cart-page">
          <div className="cart-header">
            <h2>カート</h2>
            <button className="btn-back" onClick={() => setShowCart(false)}>
              ← 商品一覧に戻る
            </button>
          </div>
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>カートは空です</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-emoji">{item.emoji}</div>
                    <div className="cart-item-info">
                      <h3>{item.name}</h3>
                      <p>¥{item.price.toLocaleString()} × {item.quantity}</p>
                    </div>
                    <button className="btn-remove" onClick={() => removeFromCart(item.id)}>
                      削除
                    </button>
                  </div>
                ))}
              </div>
              <div className="cart-footer">
                <p className="total">合計: ¥{cartTotal.toLocaleString()}</p>
                <button className="btn-primary" onClick={checkout}>購入する</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App
