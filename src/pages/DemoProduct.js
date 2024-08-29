import React, { useState } from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import { useDocTitle } from '../components/CustomHook';
import axios from 'axios';
import Notiflix from 'notiflix';

const AIRecommendation = () => {
    useDocTitle('寰宇留学 | 上传简历获取推荐学校')

    const [resume, setResume] = useState(null);
    const [recommendedSchools, setRecommendedSchools] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!resume) {
            setError('请上传简历文件');
            return;
        }

        setUploading(true);
        setError('');

        let formData = new FormData();
        formData.append('resume', resume);

        axios.post(process.env.REACT_APP_RESUME_UPLOAD_API, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            setRecommendedSchools(response.data.schools);
            Notiflix.Report.success(
                '成功',
                '推荐学校列表已更新',
                '确定'
            );
        })
        .catch(error => {
            setError('上传失败，请重试');
            Notiflix.Report.failure(
                '失败',
                '上传简历时发生错误',
                '确定'
            );
        })
        .finally(() => {
            setUploading(false);
        });
    };

    return (
        <>
            <NavBar />
            <div className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24">
                <div className="container mx-auto my-8 px-4 lg:px-20">
                    <form onSubmit={handleSubmit} className="w-full bg-white p-8 rounded-2xl shadow-2xl">
                        <h1 className="font-bold text-center text-blue-900 uppercase text-4xl">上传简历</h1>
                        <div className="my-4">
                            <input 
                                type="file" 
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none"
                            />
                            {error && 
                                <p className="text-red-500 text-sm">{error}</p>
                            }
                        </div>
                        <div className="my-2">
                            <button 
                                type="submit" 
                                disabled={uploading}
                                className={`uppercase text-sm font-bold tracking-wide ${uploading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline`}
                            >
                                {uploading ? '上传中...' : '上传简历'}
                            </button>
                        </div>
                    </form>

                    {recommendedSchools.length > 0 && (
                        <div className="mt-8 w-full bg-gray-100 p-8 rounded-2xl shadow-2xl">
                            <h2 className="font-bold text-blue-900 text-2xl">推荐学校</h2>
                            <ul className="list-disc pl-5 mt-4">
                                {recommendedSchools.map((school, index) => (
                                    <li key={index} className="text-gray-700 text-lg">{school}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AIRecommendation;