interface Props {
    mainText: string;
    subText?: string;
}

function Title({ mainText, subText }: Props) {
    return (
        <div className="fs-1 mt-3 mx-3 main_title">
            {mainText}
            {subText &&
                <div className="fs-5">
                    {subText}
                </div>
            }
        </div>
    );
}

export default Title;