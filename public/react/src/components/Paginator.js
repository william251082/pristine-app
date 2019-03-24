import React from 'react';

export class Paginator extends React.Component
{
    constructor(props) {
        super(props);
        const pageCount = 10;
        this.range = [];

        for (let i = 1; i <= pageCount; i++) {
            this.range.push(i);
        }
    }

    render() {
        return (
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link">
                            Previous
                        </button>
                    </li>
                    {
                        this.range.map(page => {
                            return (
                                <li key={page} className="page-item">
                                    <button className="page-link">
                                        {page}
                                    </button>
                                </li>
                            );
                        })
                    }

                    <li className="page-item">
                        <button className="page-link">
                            Next
                        </button>
                    </li>
                </ul>

            </nav>
        );
    }
}
