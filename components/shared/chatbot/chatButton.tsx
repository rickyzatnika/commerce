/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import React, { useState, useEffect, useRef } from 'react'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { X, Send, Loader2, ArrowDownCircleIcon } from 'lucide-react'
import { useChat } from '@ai-sdk/react'
import { useSession } from 'next-auth/react'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import 'moment/locale/id';



const ChatButton = () => {

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const chatIconRef = useRef<HTMLButtonElement>(null);
  const { data: session } = useSession();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [chatId, setChatId] = useState<string | null>(null);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowChatIcon(true);
      } else {
        setShowChatIcon(false);
        setIsChatOpen(false);
      }
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  }

  const { messages, setMessages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chatbot",
    onResponse: async (res) => {
      const data = await res.json();

      if (data?.chatId) {

        localStorage.setItem("chatId", data.chatId);
        setChatId(data.chatId); // Simpan di state agar tetap digunakan dalam sesi ini
      }

      if (data?.reply) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: data?.reply?.content,
          },
        ]);
      }
    }
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages]);


  useEffect(() => {
    const storedChatId = localStorage.getItem("chatId");
    if (storedChatId) {
      setChatId(storedChatId);
    }
  }, []);






  return (
    <div className='w-full' suppressHydrationWarning>
      {showChatIcon && (
        <div className='flex flex-col'>
          <div className={`${isChatOpen ? "right-0 " : "right-4 "} flex flex-col  transition-opacity duration-500 ease-linear fixed z-50 right-4 bottom-10`}>
            <div className='relative'>
              <p className='relative text-[#111] font-bold mb-3 rounded-xl italic text-xs md:text-lg bg-primary right-2 w-full p-2'>Butuh Team SAR ??</p>
              <span className='absolute -z-10 text-black font-bold mb-1  border-b-[1px]  rotate-45 w-0 h-0 bottom-0.5 bg-primary right-5 ml-auto p-2' />
            </div>
            <button ref={chatIconRef} onClick={toggleChat} className=' relative w-fit ml-auto rounded-full text-white p-3 bg-black drop-shadow-lg shadow'>
              {!isChatOpen ? (
                <Image src="/icons/lg.png" alt='logo' width={30} height={30} />
              ) : (
                <ArrowDownCircleIcon />
              )}
            </button>
          </div>
        </div>

      )}

      {isChatOpen && (
        <div className='w-full '>
          <Card className='fixed z-50 right-0 md:right-4 w-full sm:w-[350px] bottom-4 md:bottom-20 rounded-xl border shadow-lg overflow-hidden'>
            <CardHeader className='bg-[#080808] text-white flex items-center border-b justify-between flex-row  space-y-0'>
              <CardTitle className='flex flex-col items-center'>
                <div className='flex items-center gap-1'>
                  <Image src="/icons/logo2.png" alt="logo-dyz" width={100} height={75} priority={true} />
                </div>
              </CardTitle>
              <Button size="sm" variant="outline" className='px-2 py-0 text-black dark:text-white' onClick={toggleChat}>
                <X className='size-4' />
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className='h-[320px] pr-0 md:pr-4'>
                <div className='bg-muted p-4 mt-3'>
                  {session ? (
                    <div className='space-y-1' >
                      <p className='text-md font-bold '>`Hi, {session.user.name}`</p>
                      <p className='text-sm'>Saya AI assisten DYZ, ada yang bisa saya bantu?</p>
                    </div>

                  ) : (
                    <div className='space-y-1'>
                      <p>👋 Halo! Saya asisten AI dari toko online DYZ. Saya bisa membantu memberikan informasi tentang produk, promo, jasa pengiriman, dan lainnya. Ada yang bisa saya bantu? </p>
                    </div>
                  )}
                </div>

                {messages?.map((message, i: number) => (
                  <div key={i} className={`mb-4 mt-4 relative ${message.role === "user" ? "text-right" : "text-left"} `}>
                    <div className={` inline-block rounded-lg ${message.role === 'user' ? "bg-primary text-primary-foreground " : "bg-muted p-4"} p-2 `}>
                      <ReactMarkdown
                        // eslint-disable-next-line react/no-children-prop
                        children={message.content}
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          code({ node, inline, className, children, ...props }: any) {
                            return inline ? (
                              <>
                                <code {...props} className="bg-gray-200 px-1 rounded">{children}</code>
                              </>
                            ) : (
                              <>
                                <pre className="bg-gray-200 p-2 rounded" {...props}>
                                  <code >{children}</code>
                                </pre>
                              </>
                            )
                          },
                          ul: ({ children }) => (
                            <ul className='list-disc ml-4 '>{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <li suppressContentEditableWarning suppressHydrationWarning className='list-decimal ml-4'>{children}</li>
                          ),
                        }}
                      />
                    </div>

                  </div>
                ))}
                {isLoading && (
                  <div className='w-full items-center flex justify-center gap-3'>
                    <Loader2 className='animate-spin h-5 w-5 text-primary' />

                  </div>
                )}

                <div ref={scrollRef} />
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e, {
                  options: {
                    body: {
                      chatId,
                      messages: [{ role: "user", content: input }]
                    }
                  }
                });
              }} className='w-full flex items-center space-x-1 relative'>
                <Textarea
                  placeholder='tulis pesan...'
                  className='pr-9 h-4 resize-none overflow-hidden'
                  disabled={isLoading}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault(); // Mencegah baris baru saat Enter ditekan
                      handleSubmit(e, {
                        options: {
                          body: {
                            chatId,
                            messages: [{ role: "user", content: input }]
                          }
                        }
                      });
                    }
                  }}
                />
                {input &&
                  <button type='submit' className='absolute right-3' disabled={isLoading} >
                    <Send className='size-6 rotate-45' />
                  </button>}
              </form>
            </CardFooter>
          </Card>
        </div>
      )}


    </div>
  )
}

export default ChatButton