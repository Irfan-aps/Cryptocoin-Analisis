import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

export default function App() {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setCoins(data);
        setSelectedCoin(data[0]);
      });
  }, []);

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Crypto Technical Analysis App</h1>
      <div className="space-y-4">
        <Input
          placeholder="Cari coin..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1">
            <ul className="mt-4 space-y-2">
              {filteredCoins.map(coin => (
                <li
                  key={coin.id}
                  className={\`cursor-pointer p-2 rounded hover:bg-gray-100 \${selectedCoin?.id === coin.id ? 'bg-gray-200' : ''}\`}
                  onClick={() => setSelectedCoin(coin)}
                >
                  <img src={coin.image} alt={coin.name} className="w-5 h-5 inline mr-2" />
                  {coin.name} ({coin.symbol.toUpperCase()})
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-3">
            {selectedCoin && (
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})
                  </h2>
                  <p>Harga: ${selectedCoin.current_price}</p>
                  <p>Market Cap: ${selectedCoin.market_cap.toLocaleString()}</p>
                  <p>Volume 24h: ${selectedCoin.total_volume.toLocaleString()}</p>
                  <div className="mt-4">
                    <iframe
                      src={\`https://www.tradingview.com/widgetembed/?symbol=BINANCE:\${selectedCoin.symbol.toUpperCase()}USDT&interval=30&theme=light\`}
                      width="100%"
                      height="400"
                      frameBorder="0"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
