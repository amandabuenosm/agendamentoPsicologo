import { useEffect  } from 'react';
import api from '../services/api.js';
import "../styles/styleHomePage.css";
import "../scripts/scriptHomePage.js";

const HomePage = () => {

    useEffect(() => {
        if (window.feather) {
            window.feather.replace();
        }
    }, []);

    return (
        <div>
            <script src="https://cdn.tailwindcss.com"></script>
            <script src="https://unpkg.com/feather-icons"></script>
            <link rel="stylesheet" href="./styles/styleHomePage.css"></link>

            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <i data-feather="heart" className="text-blue-400 mr-2"></i>
                        <span className="text-2xl font-bold text-gray-800">MindCare</span>
                    </div>
                    
                    <nav className="hidden md:flex space-x-8">
                        <a href="#" className="text-gray-600 hover:text-blue-400 font-medium">Início</a>
                        <a href="#psychologists" className="text-gray-600 hover:text-blue-400 font-medium">Psicólogos</a>
                        <a href="#how-it-works" className="text-gray-600 hover:text-blue-400 font-medium">Como Funciona</a>
                        <a href="#testimonials" className="text-gray-600 hover:text-blue-400 font-medium">Depoimentos</a>
                        <a href="#blog" className="text-gray-600 hover:text-blue-400 font-medium">Blog</a>
                    </nav>
                    
                    <div className="flex items-center space-x-4">
                        <a href="#" className="hidden md:block text-gray-600 hover:text-blue-400 font-medium">Login</a>
                        <a href="#schedule" className="px-4 py-2 rounded-full btn-primary text-white font-medium">Agendar Consulta</a>
                    </div>
                    
                    <button className="md:hidden text-gray-600">
                        <i data-feather="menu"></i>
                    </button>
                </div>
            </header>

            {/* Hero */}
            <section className="hero-gradient py-20">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Cuidando da sua saúde mental com empatia e profissionalismo</h1>
                        <p className="text-lg text-gray-600 mb-8">Conectamos você aos melhores psicólogos de forma simples e acessível. Sua jornada de autoconhecimento começa aqui.</p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <a href="#schedule" className="px-6 py-3 rounded-full btn-primary text-white font-medium text-center">Agendar Consulta</a>
                            <a href="#psychologists" className="px-6 py-3 rounded-full border-2 border-blue-400 text-blue-400 font-medium text-center hover:bg-blue-50">Conhecer Psicólogos</a>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <img src="http://static.photos/medical/640x360/1" alt="Terapia online" className="rounded-lg shadow-xl max-w-md w-full"/>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Como funciona</h2>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white transition-all">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i data-feather="search" className="text-blue-500 w-8 h-8"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Encontre seu psicólogo</h3>
                            <p className="text-gray-600">Explore nossos profissionais por especialidade, abordagem e disponibilidade.</p>
                        </div>
                        
                        <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white transition-all">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i data-feather="calendar" className="text-green-500 w-8 h-8"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Agende online</h3>
                            <p className="text-gray-600">Escolha data e horário que melhor se encaixam na sua rotina.</p>
                        </div>
                        
                        <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white transition-all">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i data-feather="video" className="text-purple-500 w-8 h-8"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Conecte-se</h3>
                            <p className="text-gray-600">Faça sua sessão por vídeo ou presencialmente, conforme sua preferência.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Psychologists */}
            <section id="psychologists" className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Nossos Psicólogos</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Profissionais qualificados e especializados em diversas abordagens terapêuticas.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Psychologist Card 1 */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden psychologist-card transition-all duration-300">
                            <img src="http://static.photos/people/640x360/1" alt="Dra. Ana Silva" className="w-full h-64 object-cover"/>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">Dra. Ana Silva</h3>
                                        <p className="text-blue-500">Psicóloga Clínica</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i data-feather="star" className="text-yellow-400 fill-current w-5 h-5"></i>
                                        <span className="ml-1 text-gray-700">4.9</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4">Especialista em Terapia Cognitivo-Comportamental e ansiedade.</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">TCC</span>
                                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Ansiedade</span>
                                    <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">Depressão</span>
                                </div>
                                <a href="#schedule" className="block text-center px-4 py-2 btn-secondary rounded-full text-white font-medium">Agendar Consulta</a>
                            </div>
                        </div>
                        
                        {/* Psychologist Card 2 */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden psychologist-card transition-all duration-300">
                            <img src="http://static.photos/people/640x360/2" alt="Dr. Carlos Mendes" className="w-full h-64 object-cover"/>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">Dr. Carlos Mendes</h3>
                                        <p className="text-blue-500">Psicanalista</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i data-feather="star" className="text-yellow-400 fill-current w-5 h-5"></i>
                                        <span className="ml-1 text-gray-700">4.8</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4">Especialista em Psicanálise e questões de relacionamento.</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Psicanálise</span>
                                    <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">Relacionamentos</span>
                                    <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">Autoestima</span>
                                </div>
                                <a href="#schedule" className="block text-center px-4 py-2 btn-secondary rounded-full text-white font-medium">Agendar Consulta</a>
                            </div>
                        </div>
                        
                        {/* Psychologist Card 3 */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden psychologist-card transition-all duration-300">
                            <img src="http://static.photos/people/640x360/3" alt="Dra. Juliana Costa" className="w-full h-64 object-cover"/>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">Dra. Juliana Costa</h3>
                                        <p className="text-blue-500">Psicóloga Infantil</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i data-feather="star" className="text-yellow-400 fill-current w-5 h-5"></i>
                                        <span className="ml-1 text-gray-700">4.9</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4">Especialista em psicologia infantil e desenvolvimento.</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">Infantil</span>
                                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">Adolescentes</span>
                                    <span className="px-3 py-1 bg-teal-100 text-teal-600 rounded-full text-sm">Família</span>
                                </div>
                                <a href="#schedule" className="block text-center px-4 py-2 btn-secondary rounded-full text-white font-medium">Agendar Consulta</a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-center mt-10">
                        <a href="#" className="inline-flex items-center text-blue-500 font-medium">
                            Ver todos os psicólogos
                            <i data-feather="arrow-right" className="ml-2 w-5 h-5"></i>
                        </a>
                    </div>
                </div>
            </section>

            {/* Schedule Section */}
            <section id="schedule" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-gray-50 rounded-xl shadow-md overflow-hidden">
                        <div className="md:flex">
                            <div className="md:w-1/2 bg-blue-500 p-8 text-white">
                                <h2 className="text-2xl font-bold mb-4">Agende sua consulta</h2>
                                <p className="mb-6">Escolha entre nossos psicólogos qualificados e encontre o horário perfeito para você.</p>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <i data-feather="check-circle" className="mr-3 w-5 h-5"></i>
                                        <span>Confirmação imediata</span>
                                    </div>
                                    <div className="flex items-center">
                                        <i data-feather="check-circle" className="mr-3 w-5 h-5"></i>
                                        <span>Lembretes automáticos</span>
                                    </div>
                                    <div className="flex items-center">
                                        <i data-feather="check-circle" className="mr-3 w-5 h-5"></i>
                                        <span>Cancelamento fácil</span>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-1/2 p-8">
                                <form>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2" for="psychologist">Psicólogo</label>
                                        <select id="psychologist" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                                            <option>Selecione um psicólogo</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2" for="date">Data</label>
                                        <input type="date" id="date" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 mb-2" for="time">Horário Disponível</label>
                                        <select id="time" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                                            <option>Selecione um horário</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="w-full btn-primary py-3 rounded-full text-white font-medium">Confirmar Agendamento</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">O que nossos pacientes dizem</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Depoimentos reais de pessoas que transformaram suas vidas com nossa ajuda.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-white p-6 rounded-xl shadow-md testimonial-card">
                            <div className="flex items-center mb-4">
                                <div className="flex-shrink-0">
                                    <img src="http://static.photos/people/200x200/1" alt="Maria" className="w-12 h-12 rounded-full"/>
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-bold text-gray-800">Maria</h4>
                                    <div className="flex items-center">
                                        <div className="flex">
                                            <i data-feather="star" className="text-yellow-400 fill-current w-4 h-4"></i>
                                            <i data-feather="star" className="text-yellow-400 fill-current w-4 h-4"></i>
                                            <i data-feather="star" className="text-yellow-400 fill-current w-4 h-4"></i>
                                            <i data-feather="star" className="text-yellow-400 fill-current w-4 h-4"></i>
                                            <i data-feather="star" className="text-yellow-400 fill-current w-4 h-4"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600">"A Dra. Ana Clara me ajudou a superar minha ansiedade de uma forma que eu nunca imaginei possível. As sessões online foram tão eficazes quanto presenciais."</p>
                        </div>
                        
                        {/* Testimonial 2 */}
                        <div className="bg-white p-6 rounded-xl shadow-md testimonial-card">
                            <div className="flex items-center mb-4">
                                <div className="flex-shrink-0">
                                    <img src="http://static.photos/people/200x200/2" alt="João" className="w-12 h-12 rounded-full"/>
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-bold text-gray-800">João</h4>
                                    <div className="flex items-center">
                                        <div className="flex">
                                            <i data-feather="star" className="text-yellow-400 fill-current w-4 h-4"></i>
                                            <i data-feather="star" className="text-yellow-400 fill-current w-4 h-4"></i>
                                            <i data-feather="star" className="text-yellow-400 fill-current w-4 h-4"></i>
                                            <i data-feather="star" className="text-yellow-400 fill-current w-4 h-4"></i>
                                            <i data-feather="star" className="text-yellow-400 fill-current w-4 h-4"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600">"Depois de anos lutando contra a depressão, encontrar o Dr. Carlos foi um divisor de águas. Sua abordagem me fez entender questões que nem sabia que existiam."</p>
                        </div>
                        
                        {/* Testimonial 3 */}
                        <div className="bg-white p-6 rounded-xl shadow-md testimonial-card">
                            <div className="flex items-center mb-4">
                                <div className="flex-shrink-0">
                                    <img src="http://static.photos/people/200x200/3" alt="Fernanda" className="w-12 h-12 rounded-full"/>
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-bold text-gray-800">Fernanda</h4>
                                    <div className="flex items-center">
                                        <div className="flex">
                                            <i data-feather="star" className="text-yellow-400 fill-current w-4 h-4"></i>
                                            <i data-feather="star" className="text-yellow-400 fill-current w-4 h-4"></i>
                                            <i data-feather="star" className="text-yellow-400 fill-current w-4 h-4"></i>
                                            <i data-feather="star" className="text-yellow-400 fill-current w-4 h-4"></i>
                                            <i data-feather="star" className="text-yellow-400 fill-current w-4 h-4"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600">"Minha filha estava com dificuldades na escola e a Dra. Juliana foi incrível. Em poucos meses já vimos uma melhora significativa no comportamento e autoestima dela."</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Perguntas Frequentes</h2>
                        <p className="text-lg text-gray-600">Tire suas dúvidas sobre terapia e nosso funcionamento.</p>
                    </div>
                    
                    <div className="space-y-4">
                        {/* FAQ Item 1 */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <button className="flex justify-between items-center w-full text-left">
                                <h3 className="font-medium text-gray-800">Como funciona o agendamento online?</h3>
                                <i data-feather="chevron-down" className="text-gray-500 w-5 h-5"></i>
                            </button>
                            <div className="mt-3 text-gray-600 hidden">
                                <p>Nosso sistema de agendamento é simples e intuitivo. Basta selecionar o psicólogo de sua preferência, escolher um horário disponível na agenda dele e confirmar o agendamento. Você receberá um e-mail de confirmação com todos os detalhes.</p>
                            </div>
                        </div>
                        
                        {/* FAQ Item 2 */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <button className="flex justify-between items-center w-full text-left">
                                <h3 className="font-medium text-gray-800">As sessões online são eficazes?</h3>
                                <i data-feather="chevron-down" className="text-gray-500 w-5 h-5"></i>
                            </button>
                            <div className="mt-3 text-gray-600 hidden">
                                <p>Sim! Diversos estudos comprovam que a terapia online pode ser tão eficaz quanto a presencial para a maioria das questões psicológicas. A comodidade de fazer a sessão de casa muitas vezes ajuda o paciente a se sentir mais à vontade para se abrir.</p>
                            </div>
                        </div>
                        
                        {/* FAQ Item 3 */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <button className="flex justify-between items-center w-full text-left">
                                <h3 className="font-medium text-gray-800">Posso cancelar ou remarcar minha consulta?</h3>
                                <i data-feather="chevron-down" className="text-gray-500 w-5 h-5"></i>
                            </button>
                            <div className="mt-3 text-gray-600 hidden">
                                <p>Sim, você pode cancelar ou remarcar sua consulta com até 24 horas de antecedência sem custos. Cancelamentos com menos de 24 horas podem estar sujeitos a cobrança, dependendo da política do profissional.</p>
                            </div>
                        </div>
                        
                        {/* FAQ Item 4 */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <button className="flex justify-between items-center w-full text-left">
                                <h3 className="font-medium text-gray-800">Como escolher o psicólogo certo para mim?</h3>
                                <i data-feather="chevron-down" className="text-gray-500 w-5 h-5"></i>
                            </button>
                            <div className="mt-3 text-gray-600 hidden">
                                <p>Nossos psicólogos têm perfis detalhados com suas especialidades, abordagens e experiências. Recomendamos ler as descrições e avaliações para encontrar um profissional cuja especialização corresponda às suas necessidades. Se precisar de ajuda, nossa equipe pode orientá-lo.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-blue-500 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Pronto para cuidar da sua saúde mental?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">Agende sua primeira consulta hoje mesmo e dê o primeiro passo em direção ao seu bem-estar emocional.</p>
                    <a href="#schedule" className="inline-block px-8 py-3 bg-white text-blue-500 rounded-full font-bold hover:bg-gray-100">Agendar Consulta</a>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <div className="flex items-center mb-4">
                                <i data-feather="heart" className="text-blue-400 mr-2"></i>
                                <span className="text-xl font-bold">MindCare</span>
                            </div>
                            <p className="text-gray-400">Cuidando da sua saúde mental com empatia e profissionalismo.</p>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white">Início</a></li>
                                <li><a href="#psychologists" className="text-gray-400 hover:text-white">Psicólogos</a></li>
                                <li><a href="#how-it-works" className="text-gray-400 hover:text-white">Como Funciona</a></li>
                                <li><a href="#testimonials" className="text-gray-400 hover:text-white">Depoimentos</a></li>
                                <li><a href="#blog" className="text-gray-400 hover:text-white">Blog</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-bold mb-4">Contato</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <i data-feather="mail" className="mr-2 w-5 h-5"></i>
                                    <span className="text-gray-400">contato@mindcare.com</span>
                                </li>
                                <li className="flex items-center">
                                    <i data-feather="phone" className="mr-2 w-5 h-5"></i>
                                    <span className="text-gray-400">(11) 98765-4321</span>
                                </li>
                                <li className="flex items-center">
                                    <i data-feather="map-pin" className="mr-2 w-5 h-5"></i>
                                    <span className="text-gray-400">São Paulo, SP</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-bold mb-4">Redes Sociais</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500">
                                    <i data-feather="facebook" className="w-5 h-5"></i>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400">
                                    <i data-feather="twitter" className="w-5 h-5"></i>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600">
                                    <i data-feather="instagram" className="w-5 h-5"></i>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600">
                                    <i data-feather="linkedin" className="w-5 h-5"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 mb-4 md:mb-0">© 2023 MindCare. Todos os direitos reservados.</p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-white">Termos de Uso</a>
                            <a href="#" className="text-gray-400 hover:text-white">Política de Privacidade</a>
                        </div>
                    </div>
                </div>
            </footer>

            <script src="./scripts/scriptHomePage.js"></script>

        </div>
    );
}

export default HomePage;