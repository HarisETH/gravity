import React from 'react'
import GitHubButton from 'react-github-btn'


const Header = () => {
  return (
    <div className='py-10 flex flex-col items-center gap-4'>
        <h1 className='text-6xl font-bold text-white tracking-tighter text-gradient'>Gravity</h1>
<GitHubButton href="https://github.com/hariseth/gravity" data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large" data-show-count="true" aria-label="Star hariseth/gravity on GitHub">Star</GitHubButton>

    </div>
  )
}

export default Header