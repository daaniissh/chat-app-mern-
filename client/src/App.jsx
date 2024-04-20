import { useState } from 'react'
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'
import './App.css'
import 'stream-chat-react/dist/css/v2/index.css';
// import 'stream-chat-react/dist/scss/v2/ChannelList/ChannelList-layout.scss';
// import 'stream-chat-react/dist/scss/v2/ChannelList/ChannelList-theme.scss';
// import 'stream-chat-react/dist/scss/v2/ChannelPreview/ChannelPreview-layout.scss';
// import 'stream-chat-react/dist/scss/v2/ChannelPreview/ChannelPreview-theme.scss';
import { ChannelContainer, ChannelListContainer, Auth } from './components'

const cookies = new Cookies()
const apiKey = "tzbucjggzkkc"
const authToken = cookies.get("token")

const client = StreamChat.getInstance(apiKey)
if (authToken) {
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    phone: cookies.get('phoneNumber'),
    image: cookies.get('avatar'),
    hashPassword: cookies.get('hashPassword'),
  }, authToken)
}
function App() {
  const [createType, setCreateType] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  if (!authToken) return <Auth />

  return (
    <div className='app__wrapper' >
      <Chat client={client} theme='str-chat__theme-light'>
        <ChannelListContainer isCreating={isCreating} setIsCreating={setIsCreating} setCreateType={setCreateType} isEditing={isEditing} setIsEditing={setIsEditing} />
        <ChannelContainer isCreating={isCreating} setIsCreating={setIsCreating} isEditing={isEditing} setIsEditing={setIsEditing} createType={createType} />
      </Chat>
    </div>
  )
}

export default App
