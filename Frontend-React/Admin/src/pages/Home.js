import Logo from "../assets/homeLogo.svg";
import PlayerLogo from "../assets/playerLogo.svg";
import { Link } from "react-router-dom";
// import Auth from "../components/Auth";

const Home = () => {
	return (
		<>
			<section className="text-gray-700 body-font lg:mx-10 sm:mx-2">
				<div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
					<div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
						<img
							className="object-cover object-center rounded"
							alt="hero"
							src={Logo}
							height="410"
							width="512"
						/>
					</div>
					<div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
						<div className="sm:text-center lg:text-left">
							<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
								<span className="block xl:inline">Data to enrich your</span>{" "}
								<span className="block text-indigo-600 xl:inline">
									online business
								</span>
							</h1>
							<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
								Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
								lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
								fugiat aliqua.
							</p>
							<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
								{/* {!isAuthenticated && (
									<div className="rounded-md shadow">
										<Auth
											setIsAuthenticated={setIsAuthenticated}
											isSignIn={true}
											className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
										/>
									</div>
								)} */}
								{/* {
									<div className="mt-3 sm:mt-0 sm:ml-3">
										<Link
											to="/myToken"
											className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
										>
											My Token
										</Link>
									</div>
								} */}
								<div className="mt-3 sm:mt-0 sm:ml-3">
									<Link
										to="/dashboard"
										className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
									>
										View Dashboard
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="text-gray-700 body-font mx-10">
				<div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
					<div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
						<h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
							Before they sold out
							<br className="hidden lg:inline-block" />
							readymade gluten
						</h1>
						<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
							Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
							lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
							fugiat aliqua.
						</p>
					</div>
					<div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
						<img
							className="object-cover object-center rounded"
							alt="hero"
							src={PlayerLogo}
						/>
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
