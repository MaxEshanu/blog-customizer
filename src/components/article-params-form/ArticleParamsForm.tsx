import { useState, useRef } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	ArticleStateType,
	defaultArticleState,
	backgroundColors,
	OptionType,
	fontFamilyOptions,
	fontColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type FormProps = {
	onReset?: (options: ArticleStateType) => void;
	onSubmit?: (options: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: FormProps) => {
	const { onReset, onSubmit } = props;

	const [isOpen, setOpen] = useState(false);

	const [options, setOptions] = useState({
		fontFamilyOption: fontFamilyOptions[0],
		fontColor: fontColors[0],
		backgroundColor: backgroundColors[0],
		contentWidth: contentWidthArr[0],
		fontSizeOption: fontSizeOptions[0],
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit?.(options);
	};

	const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setOptions(defaultArticleState);
		onReset?.(defaultArticleState);
	};

	const rootRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen: isOpen,
		rootRef,
		onChange: setOpen,
		onClose: () => setOpen(false),
	});

	const arrowButtonToggler = () => setOpen(!isOpen);

	const handleFonts = (option: OptionType) => {
		setOptions({ ...options, fontFamilyOption: option });
	};

	const handleFontColors = (option: OptionType) => {
		setOptions({ ...options, fontColor: option });
	};

	const handleBackgroundColors = (option: OptionType) => {
		setOptions({ ...options, backgroundColor: option });
	};

	const handleContentWidth = (option: OptionType) => {
		setOptions({ ...options, contentWidth: option });
	};

	const handleFontSizes = (option: OptionType) => {
		setOptions({ ...options, fontSizeOption: option });
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={arrowButtonToggler} />
			<aside
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<div style={{ display: 'grid', gap: 'clamp(10px, 4vh, 50px)' }}>
						<Text size={31} weight={800} uppercase>
							{'Задайте параметры'}
						</Text>
						<Select
							onChange={handleFonts}
							selected={options.fontFamilyOption}
							placeholder='Open Sans'
							title='Шрифт'
							options={fontFamilyOptions}
						/>
						<Select
							onChange={handleFontColors}
							selected={options.fontColor}
							placeholder={options.fontColor.title}
							title='Цвет шрифта'
							options={fontColors}
						/>
						<Separator />
						<Select
							onChange={handleBackgroundColors}
							selected={options.backgroundColor}
							placeholder={options.backgroundColor.title}
							title='Цвет фона'
							options={backgroundColors}
						/>
						<Select
							onChange={handleContentWidth}
							selected={options.contentWidth}
							placeholder={options.contentWidth.title}
							title='Ширина контента'
							options={contentWidthArr}
						/>
						<RadioGroup
							onChange={handleFontSizes}
							name={options.fontSizeOption.className}
							selected={options.fontSizeOption}
							title={'Размер шрифта'}
							options={fontSizeOptions}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
