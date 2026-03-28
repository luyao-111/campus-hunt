import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameData, type Language } from '../data/gameConfig';

export default function Home() {
  const [lang, setLang] = useState<Language>('cn');
  const navigate = useNavigate();
  const routes = Object.values(gameData);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      
      {/* 标题区域：机密档案风格 */}
      <div style={{ 
        marginBottom: '40px', 
        borderBottom: '1px dashed #555', 
        paddingBottom: '20px' 
      }}>
        <h1 style={{ 
          fontSize: '36px', 
          margin: '0 0 10px 0', 
          color: '#d4af37', // 暗金色
          letterSpacing: '2px',
          textShadow: '0 0 10px rgba(212, 175, 55, 0.3)' // 微微的发光效果
        }}>
          NUSolved
        </h1>
        <h2 style={{ fontSize: '16px', margin: '0', color: '#888', letterSpacing: '4px' }}>
          CASE FILES // 校园实景解谜
        </h2>
      </div>

      {/* 语言切换器 */}
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <button 
          onClick={() => setLang('cn')}
          style={{ 
            padding: '8px 20px', 
            backgroundColor: lang === 'cn' ? '#d4af37' : 'transparent', 
            color: lang === 'cn' ? '#000' : '#888',
            border: `1px solid ${lang === 'cn' ? '#d4af37' : '#555'}`, 
            borderRadius: '0px', // 去掉圆角，更硬朗
            cursor: 'pointer',
            fontWeight: 'bold',
            fontFamily: 'inherit'
          }}
        >
          [ 中文档案 ]
        </button>
        
        <button 
          disabled={true}
          style={{ 
            padding: '8px 20px', 
            backgroundColor: 'transparent', 
            color: '#333', 
            border: '1px solid #333', 
            borderRadius: '0px', 
            cursor: 'not-allowed',
            fontFamily: 'inherit'
          }}
          title="Classified. Access Denied."
        >
          [ English ]
        </button>
      </div>

      {/* 路线选择按钮 */}
      <div style={{ textAlign: 'left', marginBottom: '15px', color: '#666', fontSize: '14px' }}>
        {'>'} SELECT_INVESTIGATION_ROUTE:
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {routes.map((route) => (
          <button
            key={route.id}
            onClick={() => navigate(`/game/${lang}/${route.id}/1`)}
            style={{ 
              padding: '15px 20px', 
              fontSize: '18px', 
              fontWeight: 'bold',
              backgroundColor: '#121212', // 深灰底色
              color: '#d3d3d3',
              border: '1px solid #444',
              borderLeft: '4px solid #d4af37', // 左侧金色高亮条
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: 'inherit',
              textTransform: 'uppercase',
              boxShadow: '0 4px 6px rgba(0,0,0,0.5)'
            }}
          >
            {route.name[lang]}
          </button>
        ))}
      </div>
    </div>
  );
}