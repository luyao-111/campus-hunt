import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gameData, validLocations } from '../data/gameConfig';
import type { Language } from '../data/gameConfig';

export default function Game() {
  const { lang, routeId, stage } = useParams();
  const navigate = useNavigate();

  const [selectedLocation, setSelectedLocation] = useState('');
  const [status, setStatus] = useState<'playing' | 'error' | 'success'>('playing');
  const [cooldownTime, setCooldownTime] = useState(0);

  const currentLang = (lang as Language) || 'cn';
  const currentStage = parseInt(stage || '1', 10);
  
  const route = routeId ? gameData[routeId] : null;
  const currentClue = route?.clues.find(c => c.stage === currentStage);

  useEffect(() => {
    if (cooldownTime > 0) {
      const timer = setTimeout(() => setCooldownTime(cooldownTime - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownTime]);

  if (!route || !currentClue) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#d4af37' }}>
        <h2>[ERROR] DATA_NOT_FOUND</h2>
        <button onClick={() => navigate('/')} style={{ padding: '10px', background: 'transparent', color: '#d4af37', border: '1px solid #d4af37', cursor: 'pointer', fontFamily: 'inherit' }}>
          RETURN_TO_BASE
        </button>
      </div>
    );
  }

  const handleCheckAnswer = () => {
    if (selectedLocation === currentClue.answer) {
      setStatus('success');
      setCooldownTime(0);
    } else {
      setStatus('error');
      setCooldownTime(5);
    }
  };

  const handleNextStage = () => {
    setStatus('playing'); 
    setSelectedLocation(''); 
    
    if (currentStage >= 5) {
      alert(currentLang === 'cn' ? "🕵️‍♂️ 调查完成！所有的线索都已汇集。" : "🕵️‍♂️ Investigation Complete!");
      navigate('/'); 
    } else {
      navigate(`/game/${currentLang}/${routeId}/${currentStage + 1}`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', fontFamily: 'inherit' }}>
      
      {/* 顶部信息栏：情报局终端风格 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        borderBottom: '1px solid #444', 
        paddingBottom: '10px', 
        marginBottom: '20px',
        color: '#888',
        fontSize: '14px'
      }}>
        <span>FILE: {route.name[currentLang]}</span>
        <span style={{ color: '#d4af37' }}>STAGE {currentStage} / 5</span>
      </div>

      {/* 线索展示区：像一张放在暗桌上的拍立得或信件 */}
      <div style={{ 
        background: '#151515', 
        padding: '20px', 
        border: '1px solid #333',
        borderTop: '2px solid #555',
        marginBottom: '25px', 
        minHeight: '150px',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
      }}>
        <div style={{ color: '#555', fontSize: '12px', marginBottom: '15px' }}>// EVIDENCE_ATTACHED</div>

        {currentClue.type === 'text' && (
          <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#d3d3d3' }}>{currentClue.content[currentLang]}</p>
        )}
        
        {currentClue.type === 'image' && (
          <img src={currentClue.content[currentLang]} alt="Clue" style={{ width: '100%', border: '1px solid #444', filter: 'grayscale(20%) contrast(110%)' }} />
        )}

        {currentClue.type === 'image-text' && (
          <div>
            <img src={currentClue.content[currentLang]} alt="Clue" style={{ width: '100%', border: '1px solid #444', filter: 'grayscale(20%) contrast(110%)', marginBottom: '15px' }} />
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#d4af37', borderLeft: '2px solid #d4af37', paddingLeft: '10px' }}>
              {currentClue.caption?.[currentLang]}
            </p>
          </div>
        )}

        {currentClue.type === 'audio' && (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <p style={{ marginBottom: '15px', color: '#888' }}>
              [ AUDIO_INTERCEPTED ]
            </p>
            <audio controls src={currentClue.content[currentLang]} style={{ width: '100%', filter: 'invert(90%)' }}>
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        {currentClue.type === 'link' && (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <p style={{ fontSize: '16px', marginBottom: '20px', color: '#d3d3d3' }}>
              {currentClue.content[currentLang]}
            </p>
            <a href={currentClue.url} target="_blank" rel="noopener noreferrer" style={{ 
                display: 'inline-block', padding: '10px 20px', backgroundColor: '#222', color: '#d4af37', textDecoration: 'none', border: '1px dashed #d4af37'
              }}>
              [ DECRYPT_EXTERNAL_LINK ]
            </a>
          </div>
        )}
      </div>

      {/* 互动区 */}
      {status !== 'success' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <select 
            value={selectedLocation} 
            onChange={(e) => { setSelectedLocation(e.target.value); setStatus('playing'); }}
            disabled={cooldownTime > 0}
            style={{ 
              padding: '12px', fontSize: '16px', border: '1px solid #444',
              backgroundColor: cooldownTime > 0 ? '#111' : '#1a1a1a', 
              color: cooldownTime > 0 ? '#555' : '#e0e0e0',
              cursor: cooldownTime > 0 ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              outline: 'none'
            }}
          >
            <option value="" disabled>-- TARGET_LOCATION --</option>
            {validLocations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          {status === 'error' && (
            <div style={{ color: '#ff4444', textAlign: 'center', fontWeight: 'bold', textShadow: '0 0 5px rgba(255,0,0,0.5)' }}>
              [ WARNING: INCORRECT_LOCATION ]
            </div>
          )}

          <button 
            onClick={handleCheckAnswer}
            disabled={!selectedLocation || cooldownTime > 0}
            style={{ 
              padding: '12px', 
              backgroundColor: (!selectedLocation || cooldownTime > 0) ? '#222' : '#d4af37', 
              color: (!selectedLocation || cooldownTime > 0) ? '#555' : '#000', 
              border: 'none', 
              fontSize: '16px', fontWeight: 'bold',
              cursor: (!selectedLocation || cooldownTime > 0) ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', letterSpacing: '1px', textTransform: 'uppercase'
            }}
          >
            {cooldownTime > 0 
              ? `SYSTEM_LOCKED [ ${cooldownTime}s ]` 
              : 'VERIFY_LOCATION'}
          </button>
        </div>
      )}

      {/* 成功状态 */}
      {status === 'success' && (
        <div style={{ textAlign: 'center', padding: '25px 20px', backgroundColor: '#0a1a0a', border: '1px solid #2e7d32', color: '#4caf50' }}>
          <h3 style={{ margin: '0 0 10px 0', letterSpacing: '2px' }}>[ ACCESS_GRANTED ]</h3>
          <p style={{ margin: '0 0 20px 0', color: '#a5d6a7' }}>坐标验证通过，已获取下一步行动指令。</p>
          <button 
            onClick={handleNextStage}
            style={{ padding: '10px 20px', backgroundColor: 'transparent', color: '#4caf50', border: '1px solid #4caf50', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 'bold' }}
          >
            PROCEED_TO_NEXT {'>'}
          </button>
        </div>
      )}

    </div>
  );
}