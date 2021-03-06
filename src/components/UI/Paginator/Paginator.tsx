import React from "react";
import classes from './Paginator.module.scss'

type PropsType = {
    pagesCount: number
    currentPage: number
    onPageChanged: (pageNum: number) => void
    isFetching: boolean
}

const Paginator: React.FC<PropsType> = ({pagesCount, currentPage, onPageChanged, isFetching}) => {

    const n = currentPage;
    const D = 7; //pages to draw
    const P = pagesCount;

    const onPageChangedHandler = (k: number): void => {
        onPageChanged(k);
    };

    if(P === 0) {
        return null;
    }

    let a: number = 0;
    let b: number = 0;

    if(P <= D) {
        a = 1;
        b = P;
    } else if(P > D) {
        if(n <= Math.floor(D/2)) {
            a = 1;
            b = D;
        } else if(P - n <= Math.floor(D/2)) {
            a = P - D + 1;
            b = P;
        } else if(n > Math.floor(D/2) && P - n > Math.floor(D/2)) {
            a = n - Math.floor(D/2);
            b = n + Math.floor(D/2);
        }
    }

    const pages = [];

    if(a >= 2) {
        pages.push(
            <button
                key="1"
                disabled={isFetching}
                onClick={() => onPageChangedHandler(1)}
            >1
            </button>
        );
        pages.push(
            <button className={classes.dots}
                key='startDisabled'
                disabled={true}
            >...
            </button>
        );

    }
    for (let i = a; i <= b; i++) {
        pages.push(
            <button
                key={i}
                disabled={isFetching}
                className={n === i ? classes.active : ''}
                onClick={() => onPageChangedHandler(i)}
            >{i}
            </button>
        );
    }

    if(b <= P - 1) {
        pages.push(
            <button className={classes.dots}
                key='endDisabled'
                disabled={true}
            >...
            </button>
        );
        pages.push(
            <button
                key={P}
                disabled={isFetching}
                onClick={() => onPageChangedHandler(P)}
            >{P}
            </button>
        );

    }

    return (
        <div className={classes.Paginator}>
            {
                pages.map((page) => {return page})
            }
        </div>
    )
};

export default Paginator;