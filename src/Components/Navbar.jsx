'use client';
import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import logo from '@/assets/images/logo.png'
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const Links = [
    { name: 'Home', url: '/Main' },
    { name: 'About Us', url: '/About' },
    { name: 'Contact', url: '/Contact' },
    { 
      name: 'Services', 
      url: '/Services',
      dropdownItems: [
        { name: 'Emergency Support', url: '/Services/Emergency' },
        { name: 'Access Midwives', url: '/Services/Midwives' }
      ]
    },
]

const Navbar = () => {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mounted, setMounted] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    
    // Handle initial redirect
    if (window.location.pathname === '/') {
      router.push('/Main')
    }
  }, [router])

  const handleClick = (linkName) => {
    if (openDropdown === linkName) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(linkName)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && !event.target.closest('.dropdown-container')) {
        setOpenDropdown(null)
      }
    }

    if (mounted) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [openDropdown, mounted])

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSearchOpen && !event.target.closest('.search-container')) {
        setIsSearchOpen(false)
      }
    }

    if (mounted) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isSearchOpen, mounted])

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const performSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Search failed:', response.status, response.statusText);
        setSearchResults([]);
        return;
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
  }, []);

  const debouncedSearch = useCallback(
    debounce((query) => performSearch(query), 300),
    [performSearch]
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleResultClick = (url) => {
    router.push(url);
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  if (!mounted) {
    return null 
  }

  return (
    <nav className="flex justify-between items-center w-full px-6 py-4">
      <Link href="/Main">
        <Image 
          src={logo} 
          alt="Logo" 
          width={200}
          height={65}
          priority={true}
          className="h-[65px] w-auto"
        />
      </Link>

      <ul className="flex items-center justify-center mr-[-100px] flex-[0.8]">
        {Links.map(link => (
          <li 
            key={link.name} 
            className="inline-block relative dropdown-container"
          >
            {link.dropdownItems ? (
              <>
                <button 
                  onClick={() => handleClick(link.name)}
                  className={`mx-2 transition-colors duration-200 font-medium flex items-center ${
                    pathname.startsWith(link.url)
                      ? 'text-[#DFB3C0] font-bold' 
                      : 'text-black hover:text-[#DFB3C0]'
                  }`}
                >
                  {link.name}
                  <MdOutlineKeyboardArrowDown className={`ml-1 transform ${openDropdown === link.name ? 'rotate-180' : ''} transition-transform duration-200`} />
                </button>
                {openDropdown === link.name && (
                  <div 
                    id={`dropdown-${link.name}`}
                    className="absolute left-0 mt-2 w-48 rounded-md shadow-transparent bg-[#E6E6E6] ring-1 ring-black ring-opacity-5 z-20"
                  >
                    <div className="py-1">
                      {link.dropdownItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.url}
                          className={`block px-4 py-2 text-sm font-medium ${
                            pathname === item.url
                              ? 'text-[#DFB3C0] font-bold'
                              : 'text-gray-700 hover:text-[#DFB3C0]'
                          }`}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link 
                href={link.url}
                className={`mx-2 transition-colors duration-200 font-medium ${
                  pathname === link.url
                    ? 'text-[#DFB3C0] font-bold' 
                    : 'text-black hover:text-[#DFB3C0]'
                }`}
              >
                {link.name}
              </Link>
            )}
          </li>
        ))}
      </ul>

      <div className='flex items-center'>
        <div className="relative search-container">
          <button
            onClick={handleSearchClick}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#AE4B68] hover:bg-[#c799a7] transition-colors duration-200"
          >
            {isSearchOpen ? (
              <IoMdClose className="text-xl text-white" />
            ) : (
              <IoSearchOutline className="text-xl text-white" />
            )}
          </button>

          {isSearchOpen && (
            <div className="absolute right-0 mt-1.5 w-80 bg-white rounded-lg shadow-lg p-4 z-50">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#DFB3C0]"
                  autoFocus
                />
                <IoSearchOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {searchResults.length > 0 && (
                <div className="mt-2 max-h-60 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleResultClick(result.url)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
                    >
                      <div className="flex flex-col">
                        {result.type === 'midwife' ? (
                          <>
                            <span className="text-sm font-medium text-[#AE4B68]">{result.details.name}</span>
                            <span className="text-xs text-gray-600">{result.details.location}</span>
                            <span className="text-xs text-gray-500">{result.details.phone}</span>
                            <span className="text-xs text-gray-400">{result.details.specialties}</span>
                          </>
                        ) : (
                          <div className="flex items-center">
                            <IoSearchOutline className="mr-2 text-gray-400" />
                            <span className="text-sm text-gray-700">{result.title}</span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {searchQuery && searchResults.length === 0 && (
                <div className="mt-2 px-4 py-2 text-sm text-gray-500">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
        <span className='block text-center mt-2 font-medium ml-4'>
          Search
        </span>
        <Link href="/SignUp">
          <span className={`block text-center mt-2 mx-10 transition-colors duration-200 font-medium ${
            pathname === '/SignUp' 
              ? 'text-[#DFB3C0] font-bold' 
              : 'text-black hover:text-[#DFB3C0]'
          }`}>
            Sign Up
          </span>
        </Link>
        <Link href="/Help">
          <button className="px-5 py-1.5 bg-[#AE4B68] text-white font-medium rounded-md hover:bg-[#c799a7] transition-colors duration-200">
            Get Help
          </button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
