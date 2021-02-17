/*
 *This file is part of Buckshee Enterprise.
 **
 * Copyright (C) 2020 onwards Buckshee LTD
 **
 * If you do not have an agreement with Buckshee
 * LTD, you may not access, use, modify, or distribute this software.
 * Please contact [buckshee@gmail.com] for more information.
 *
 */

import NewsAPI from "newsapi";

import { News } from "../news/models/news";
const getNews = async () => {
  const newsapi = new NewsAPI("d2fedb2efcd04b158ae4e051ee91bb2a");
  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  categories.forEach(async (category) => {
    newsapi.v2
      .topHeadlines({
        language: "en",
        country: "nz",
        category: category,
      })
      .then((response) => {
        if (response.status == "ok") {
          response.articles.forEach(async (article) => {
            try {
              const news = await News.findOne({
                publishedAt: article.publishedAt,
              });
              if (news) {
                const error = new Error("It is in Mongoose");
                error.code = 401;
                throw error;
              }
              await new News({
                title: article.title,
                authorName: article.author,
                authorProfileImageUrl: null,
                authorEmails: null,
                authorTwitter: null,
                authorRanking: null,
                paid: false,
                description: article.description,
                urlToImage: article.urlToImage,
                video: null,
                url: article.url,
                category: category,
                publishedAt: article.publishedAt,
              }).save();
              return { succeed: true };
            } catch (error) {
              return new Error("Password is incorrect.", error);
            }
          });
        } else {
          console.log(response.message);
        }
      });
  });
};

export { getNews };
