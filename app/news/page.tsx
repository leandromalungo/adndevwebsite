
import React from 'react';
import HeroSection from '@/components/news/HeroSection';
import ArticleGrid from '@/components/news/ArticleGrid';
import DarkHero from '@/components/news/DarkHero';
import TrendingGrid from '@/components/news/TrendingGrid';
import SocialSidebar from '@/components/news/SocialSidebar';
import { Post } from '@/data/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Page = () => {
  // Existing Data
  const featuredPost: Post = {
    id: 'hero-main',
    category: 'Renewable Energy',
    categoryColor: '#26a69a',
    title: 'Exploring Future Renewable Energy Innovations',
    author: 'Admin',
    date: 'December 11, 2023',
    commentsCount: 12,
    videoUrl: 'https://cdn.pixabay.com/vimeo/329596898/mountains-22927.mp4?width=1280&hash=d82d439f75f7e6f366166f7f63116669f5370f61',
  };

  const heroSidebarPosts: Post[] = [
    {
      id: 'hero-1',
      category: 'Startup',
      categoryColor: '#2196f3',
      title: 'From Ideas to Impact in a Startup\'s Journey',
      author: 'Admin',
      date: 'November 20, 2023',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'hero-2',
      category: 'Insights',
      categoryColor: '#ff9800',
      title: 'Navigating the Tech Landscape with Insights',
      author: 'Admin',
      date: 'November 20, 2023',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'hero-3',
      category: 'Culture',
      categoryColor: '#e91e63',
      title: 'Behind the Scenes of Crafting Our Startup',
      author: 'Admin',
      date: 'November 20, 2023',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400',
    }
  ];

  // Benqu Dark Design Data
  const benquMainHero: Post = {
    id: 'benqu-hero',
    category: 'Fashion',
    categoryColor: '#e91e63',
    title: 'Fasion Trends and Li Edelkoort the Culture Shock Special Report',
    author: 'David',
    date: 'Jul 07, 2022',
    commentsCount: 1,
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200',
  };

  const benquSidePosts: Post[] = [
    { id: 'bp-1', category: 'Fashion', categoryColor: '#e91e63', title: 'Trip Iqaluit Nunavut A Canadian Arctic City', author: 'David', date: 'Jul 07, 2022', imageUrl: 'https://images.unsplash.com/photo-1517511620798-cec17d428bc0?auto=format&fit=crop&q=80&w=200' },
    { id: 'bp-2', category: 'Creative', categoryColor: '#ff9800', title: 'Sony Laptops Are Still Part Of The Sony Family', author: 'David', date: 'Jul 07, 2022', imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=200' },
    { id: 'bp-3', category: 'Sports', categoryColor: '#4caf50', title: 'Copa America: Suarez devastated US', author: 'David', date: 'Jul 07, 2022', imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=200' },
    { id: 'bp-4', category: 'Tech', categoryColor: '#2196f3', title: 'We believe Apple Will announce iPhone.', author: 'David', date: 'Jul 07, 2022', imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=200' },
    { id: 'bp-5', category: 'Music', categoryColor: '#9c27b0', title: '10 Things I\'ve Learnt at Money Freelancer', author: 'David', date: 'Jul 07, 2022', imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=200' },
    { id: 'bp-6', category: 'Travel', categoryColor: '#00bcd4', title: 'Trip To Iqaluit In Nunavut A Canadian Arctic Nice City..', author: 'David', date: 'Jul 07, 2022', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=200' },
  ];

  const trendingRowPosts: Post[] = [
    { id: 'tr-1', category: 'Creative', categoryColor: '#ff9800', title: 'African Nations Are Struggling To Save Ready Their Wildlife', author: 'David', date: 'Jul 07, 2022', imageUrl: 'https://images.unsplash.com/photo-1516422266218-948c7258380e?auto=format&fit=crop&q=80&w=400', commentsCount: 0 },
    { id: 'tr-2', category: 'Racing', categoryColor: '#ff5722', title: 'Emirates Palace Spends that a Hefty Sum For...', author: 'David', date: 'Jul 07, 2022', imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=400', commentsCount: 0 },
    { id: 'tr-3', category: 'Tech', categoryColor: '#2196f3', title: 'Nintendo Labo VR hands This virtual Reality Gets Weird', author: 'David', date: 'Jul 07, 2022', imageUrl: 'https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?auto=format&fit=crop&q=80&w=400', commentsCount: 0 },
    { id: 'tr-4', category: 'Food', categoryColor: '#ff9800', title: 'Boxed Water Partners With To Consumer Creativity.', author: 'David', date: 'Jul 07, 2022', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400', commentsCount: 0 },
    { id: 'tr-5', category: 'Innovation', categoryColor: '#26a69a', title: 'The Future of Urban Transportation and Green Energy', author: 'David', date: 'Aug 12, 2022', imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400', commentsCount: 3 },
    { id: 'tr-6', category: 'Lifestyle', categoryColor: '#e91e63', title: 'Minimalist Design: How Less is Actually More', author: 'David', date: 'Sep 05, 2022', imageUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=400', commentsCount: 5 },
  ];

  const articleGridPosts: Post[] = [
    { id: 'ag-1', category: 'Creative', categoryColor: '#ff9800', title: 'African Nations Are Struggling To Save Ready Their Wildlife', author: 'David', date: 'Jul 07, 2022', imageUrl: 'https://images.unsplash.com/photo-1516422266218-948c7258380e?auto=format&fit=crop&q=80&w=400', commentsCount: 0 },
    { id: 'ag-2', category: 'Racing', categoryColor: '#ff5722', title: 'Emirates Palace Spends that a Hefty Sum For...', author: 'David', date: 'Jul 07, 2022', imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=400', commentsCount: 0 },
    { id: 'ag-3', category: 'Tech', categoryColor: '#2196f3', title: 'Nintendo Labo VR hands This virtual Reality Gets Weird', author: 'David', date: 'Jul 07, 2022', imageUrl: 'https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?auto=format&fit=crop&q=80&w=400', commentsCount: 0 },
    { id: 'ag-4', category: 'Food', categoryColor: '#ff9800', title: 'Boxed Water Partners With To Consumer Creativity.', author: 'David', date: 'Jul 07, 2022', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400', commentsCount: 0 },
    { id: 'ag-5', category: 'Innovation', categoryColor: '#26a69a', title: 'The Future of Urban Transportation and Green Energy', author: 'David', date: 'Aug 12, 2022', imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400', commentsCount: 3 },
    { id: 'ag-6', category: 'Lifestyle', categoryColor: '#e91e63', title: 'Minimalist Design: How Less is Actually More', author: 'David', date: 'Sep 05, 2022', imageUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=400', commentsCount: 5 },
    { id: 'ag-7', category: 'Health', categoryColor: '#4caf50', title: 'New Research on Mental Wellness and Work-Life Balance', author: 'David', date: 'Aug 20, 2022', imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400', commentsCount: 2 },
    { id: 'ag-8', category: 'Business', categoryColor: '#ff6f00', title: 'Growth Strategies for Emerging Markets in Asia', author: 'David', date: 'Sep 15, 2022', imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400', commentsCount: 8 },
  ];

  return (
    <div className="min-h-screen bg-white"> 
    <Navbar />
      <main>

        {/* Previous sections kept as requested */}
        <HeroSection featuredPost={featuredPost} sidebarPosts={heroSidebarPosts} />

        {/* Benqu Layout - Dark Hero Section (Now White) */}
        <DarkHero mainPost={benquMainHero} sidePosts={benquSidePosts} />

        {/* Trending Stories Grid (Now White + Auto Slider with 6 items) */}
        <TrendingGrid posts={trendingRowPosts} title="Trending Stories" />

        {/* Split Section with Article and Social Sidebar (Now White) */}
        <section className="bg-white py-12">
            <div className="container mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {/* Placeholder for another main list item */}
                    <div className="group cursor-pointer bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <div className="aspect-video rounded-xl overflow-hidden mb-6">
                            <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="food" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#0e2a47] mb-4">How healthy eating can improve your performance and focus throughout the day</h2>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 font-bold">
                            <span>BY DAVID</span>
                            <span>JULY 07, 2022</span>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <SocialSidebar />
                </div>
            </div>
        </section>

        {/* Existing Article Grid from light design */}
        <div className="bg-white">
          <ArticleGrid posts={articleGridPosts} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
