import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { getWritingBySlug } from "../../lib/writing";


export default function WritingDetail({ darkMode }) {
    const { slug } = useParams();
    const post = getWritingBySlug(slug);



    if (!post) {

        return (
            <section className={`min-h-screen px-8 md:px-16 py-16 ${darkMode ? "bg-ink text-white" : "bg-paper text-black"}`}>
                <p className="mb-4">Couldn't find that post.</p>
                <Link to="/writings" className="text-blue-500 underline">Back to all writings</Link>
            </section>
        );
    }

    return (
        <section className={`min-h-screen px-8 md:px-16 py-16 transition-colors duration-300 ${darkMode ? "bg-ink" : "bg-paper"}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-3xl mx-auto"
            >
                <Link
                    to="/writings"
                    className={`inline-block mb-8 text-sm font-semibold uppercase tracking-wide border-b-2 border-blue-500 pb-1 ${darkMode ? "text-white" : "text-black"}`}
                >
                    ← All Writings
                </Link>

                <h1 className={`text-4xl md:text-5xl font-black font-display leading-tight mb-3 ${darkMode ? "text-white" : "text-black"}`}>
                    {post.title}
                </h1>
                <p className="text-sm italic text-blue-500 mb-10">{post.date}</p>

                <div className={`prose max-w-none ${darkMode ? "prose-invert" : ""}`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                                 {post.content}
                    </ReactMarkdown>
                </div>
            </motion.div>
        </section>
    );
}