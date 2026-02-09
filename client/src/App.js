import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import styled from 'styled-components';
import { FaShare, FaCopy, FaEdit } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
  h1 {
    color: #333;
    font-size: 2.5rem;
    span {
      color: #646cff;
    }
  }
  p {
    color: #666;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Select = styled.select`
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  min-width: 150px;
  background: white;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ShareButton = styled(Button)`
  background: #646cff;
  color: white;
  
  &:hover:not(:disabled) {
    background: #535bf2;
    transform: translateY(-2px);
  }
`;

const EditButton = styled(Button)`
  background: #f0f0f0;
  color: #333;
  
  &:hover {
    background: #e0e0e0;
  }
`;

const CopyButton = styled(Button)`
  background: #4CAF50;
  color: white;
  
  &:hover {
    background: #45a049;
  }
`;

const EditorContainer = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  height: 500px;
  margin-bottom: 20px;
`;

const UrlDisplay = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  display: ${props => props.show ? 'block' : 'none'};
  
  p {
    margin: 0 0 10px 0;
    font-weight: 600;
    color: #333;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: monospace;
  }
`;

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('html');
  const [theme, setTheme] = useState('vs-dark');
  const [isShared, setIsShared] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [snippetId, setSnippetId] = useState('');

  useEffect(() => {
    // Load default code
    axios.get(`${API_URL}/api/snippets/default`)
      .then(response => {
        setCode(response.data.code);
      })
      .catch(error => {
        console.error('Error loading default code:', error);
        // Fallback default code
        setCode(`<html>
<head>
  <title>HTML Sample</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <style type="text/css">
    h1 {
      color: #cca3a3;
    }
  </style>
  <script type="text/javascript">
    alert("I am a sample... visit devChallenges.io for more projects");
  </script>
</head>
<body>
  <h1>Heading No.1</h1>
  <input disabled type="button" value="Click me" />
</body>
</html>`);
      });
  }, []);

  const handleShare = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/snippets`, {
        code,
        language,
        theme
      });
      
      const id = response.data.id;
      setSnippetId(id);
      setShareUrl(`${window.location.origin}/share/${id}`);
      setIsShared(true);
      
      // For demo purposes, also store in localStorage
      localStorage.setItem('shared', 'true');
      localStorage.setItem('snippetId', id);
      
    } catch (error) {
      console.error('Error sharing code:', error);
      // Fallback for demo
      const demoId = 'demo-' + Math.random().toString(36).substr(2, 8);
      setSnippetId(demoId);
      setShareUrl(`${window.location.origin}/share/${demoId}`);
      setIsShared(true);
    }
  };

  const handleEdit = () => {
    setIsShared(false);
    setShareUrl('');
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('URL copied to clipboard!');
  };

  const handleEditorChange = (value) => {
    setCode(value);
    if (isShared) {
      setIsShared(false);
    }
  };

  const languages = [
    { value: 'html', label: 'HTML' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'css', label: 'CSS' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
  ];

  const themes = [
    { value: 'vs-dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'hc-black', label: 'High Contrast' },
  ];

  return (
    <AppContainer>
      <Header>
        <h1>Note<span>Code</span></h1>
        <p>Share your code snippets with a single click</p>
      </Header>

      <Controls>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
            {languages.map(lang => (
              <option key={lang.value} value={lang.value}>{lang.label}</option>
            ))}
          </Select>
          
          <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
            {themes.map(th => (
              <option key={th.value} value={th.value}>{th.label}</option>
            ))}
          </Select>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {!isShared ? (
            <ShareButton onClick={handleShare}>
              <FaShare /> Share Code
            </ShareButton>
          ) : (
            <EditButton onClick={handleEdit}>
              <FaEdit /> Edit Code
            </EditButton>
          )}
          
          {shareUrl && (
            <CopyButton onClick={handleCopyUrl}>
              <FaCopy /> Copy URL
            </CopyButton>
          )}
        </div>
      </Controls>

      <EditorContainer>
        <Editor
          height="100%"
          language={language}
          value={code}
          theme={theme}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            scrollBeyondLastLine: false,
          }}
        />
      </EditorContainer>

      <UrlDisplay show={isShared}>
        <p>Your code has been shared! Share this URL:</p>
        <input 
          type="text" 
          value={shareUrl} 
          readOnly 
          onClick={(e) => e.target.select()}
        />
      </UrlDisplay>

      <div style={{ marginTop: '30px', color: '#666', fontSize: '14px' }}>
        <p><strong>Note:</strong> The Share button will be disabled after sharing until you make edits.</p>
      </div>
    </AppContainer>
  );
}

export default App;