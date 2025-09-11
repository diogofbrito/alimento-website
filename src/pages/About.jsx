import { AnimatedH1, AnimatedPAfterH1, AnimatedImage } from '../components/AnimatedText';
import AlimentoStudio from '../assets/Images/sobreAlimento.jpg';

export function About() {
	return (
		<div className='px-12 '>
			<div className='h-[70vh] w-full bg-center bg-cover' style={{ backgroundImage: `url(${AlimentoStudio})` }}></div>
			<div className=' grid grid-cols-6 gap-12 py-12'>
				<div className='col-span-2 flex flex-col gap-1'>
					<AnimatedH1 className='epilogueRegular'>ALIMENTO STUDIO</AnimatedH1>
					<AnimatedPAfterH1 className='  tracking-wide leading-[1.3] gambarino'>
						Patricia Gabriel é uma artista multissensorial, chef e professora de Lisboa, cuja prática cruza gastronomia, arte e educação. Com uma formação que vai das Ciências Gastronómicas à
						Matemática, desenvolve projetos que exploram a relação entre comida, cultura e território, através de performances, residências artísticas e criações culinárias inovadoras. O seu percurso
						inclui experiências internacionais em países como Índia, Indonésia e França, bem como colaborações em festivais e publicações dedicadas ao design alimentar e à experimentação sensorial.
						Paralelamente, dedica-se ao ensino e à investigação, com especial enfoque no uso de macroalgas e plantas halófitas na cozinha contemporânea. A sua obra procura despertar sentidos e
						consciências, promovendo o encontro entre tradição, sustentabilidade e novas formas de criar e partilhar experiências gastronómicas.
					</AnimatedPAfterH1>
				</div>

				<div className='col-span-2'>
					<div>
						<AnimatedH1 className='epilogueRegular'>PATRICIA GABRIEL</AnimatedH1>
						<AnimatedPAfterH1 className=' tracking-wide leading-[1.3] gambarino'>
							Patricia Gabriel é uma artista multissensorial, chef e professora de Lisboa, cuja prática cruza gastronomia, arte e educação. Com uma formação que vai das Ciências Gastronómicas à
							Matemática, desenvolve projetos que exploram a relação entre comida, cultura e território, através de performances, residências artísticas e criações culinárias inovadoras. O seu
							percurso inclui experiências internacionais em países como Índia, Indonésia e França, bem como colaborações em festivais e publicações dedicadas ao design alimentar e à experimentação
							sensorial. Paralelamente, dedica-se ao ensino e à investigação, com especial enfoque no uso de macroalgas e plantas halófitas na cozinha contemporânea. A sua obra procura despertar
							sentidos e consciências, promovendo o encontro entre tradição, sustentabilidade e novas formas de criar e partilhar experiências gastronómicas.
						</AnimatedPAfterH1>
					</div>
				</div>
			</div>
		</div>
	);
}
