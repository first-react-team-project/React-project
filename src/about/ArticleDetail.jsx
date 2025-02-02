import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { database, ref, get } from "./firebase";
import "./ArticleDetail.css";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleRef = ref(database, `articles/${id}`);
        const snapshot = await get(articleRef);
        if (snapshot.exists()) {
          setArticle(snapshot.val());
        } else {
          setError("Article not found");
        }
      } catch (err) {
        setError("Error fetching article: " + err.message);
        console.error(err);
      }
    };
    fetchArticle();
  }, [id]);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!article) {
    return <h2>Loading article...</h2>;
  }

  return (
    <div className="article-detail-container">
      {article.image && <img src={article.image} alt={article.title} />}
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <Link to="/articles" className="back-button">Back to Articles</Link>
    </div>
  );
};

export default ArticleDetail;
