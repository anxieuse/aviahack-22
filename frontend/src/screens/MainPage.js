import '../components/CommonStyle.css';
import * as React from 'react';
import FlatList from 'flatlist-react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const { Meta } = Card;

function MainPage() {
    const [progressArr, setProgressArr] = React.useState(0);
    const [progressLoad, setProgressLoad] = React.useState(0);
    const [progressWay, setProgressWay] = React.useState(0);
    const [progressFinal, setProgressFinal] = React.useState(0);

    const Drivers = [
        {
            name: 'Alex',
            id: 1,
            color: 'rgba(61, 188, 74, 0.17)'
        },
        {
            name: 'Dmitry',
            id: 2,
            color: 'rgba(255, 230, 7, 0.24)'
        },
        {
            name: 'Georgy',
            id: 3,
            color: 'rgba(253, 56, 56, 0.11)'
        },
        {
            name: 'Leo',
            id: 4,
            color: 'rgba(61, 188, 74, 0.17)'
        },
        {
            name: 'David',
            id: 5,
            color: 'rgba(253, 56, 56, 0.11)'
        },
        {
            name: 'Alexey',
            id: 6,
            color: 'rgba(61, 188, 74, 0.17)'
        }
    ];

    const Tasks = [
        {
            name: 'David',
            id: 1,
        },
        {
            name: 'David',
            id: 2,
        }
    ]

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgressArr((oldProgress) => {
                if (oldProgress === 100) {
                    return 100;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    React.useEffect(() => {
        if (progressArr === 100) {
            const timer = setInterval(() => {
                setProgressLoad((oldProgress) => {
                    if (oldProgress === 100) {
                        return 100;
                    }
                    const diff = Math.random() * 10;
                    return Math.min(oldProgress + diff, 100);
                });
            }, 500);

            return () => {
                clearInterval(timer);
            };
        }
    }, [progressArr]);

    React.useEffect(() => {
        if (progressLoad === 100) {
            const timer = setInterval(() => {
                setProgressWay((oldProgress) => {
                    if (oldProgress === 100) {
                        return 100;
                    }
                    const diff = Math.random() * 10;
                    return Math.min(oldProgress + diff, 100);
                });
            }, 500);
            return () => {
                clearInterval(timer);
            };
        }
    }, [progressLoad]);

    React.useEffect(() => {
        if (progressWay === 100) {
            const timer = setInterval(() => {
                setProgressFinal((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 1));
            }, 800);
            return () => {
                clearInterval(timer);
            };
        }
    }, [progressWay]);

    return(
        <div className="MainPage">
            <FlatList
                list={Drivers}
                displayGrid
                minColumnWidth={'300px'}
                rowGap={'10px'}
                gridGap={'40px'}
                renderItem={(item) => (
                    <div className={'Render'} style={{backgroundColor: '#ffffff'}}>
                        <Card
                            style={{
                                width: 300,
                                backgroundColor: item.color,
                            }}
                            actions={
                            [<Box className={'Row'} sx={{ width: 240, flex: 1 }}>
                                <LinearProgress
                                    value={progressArr}
                                    style={{backgroundColor: '#f8f8f8', borderRadius: 100, width: 70, marginRight: 10}}
                                    variant={"determinate"}
                                    color="success"
                                />
                                <LinearProgress
                                    value={progressLoad}
                                    style={{backgroundColor: '#f8f8f8', borderRadius: 100, width: 70, marginRight: 10}}
                                    variant={'determinate'}
                                    color="success"
                                />
                                <LinearProgress
                                    value={progressWay}
                                    style={{backgroundColor: '#f8f8f8', borderRadius: 100, width: 70, marginRight: 10}}
                                    variant={'determinate'}
                                    color="success"
                                />
                                <LinearProgress
                                    value={progressFinal}
                                    style={{backgroundColor: '#f8f8f8', borderRadius: 100, width: 70}}
                                    variant={'determinate'}
                                    color="success"
                                />
                            </Box>]}
                        >
                            <Meta
                                title={item.name}
                                description={<FlatList
                                    list={Tasks}
                                    displayGrid
                                    renderItem={(item) => (
                                    <div className={'Task'}>
                                        <text>{item.name}</text>
                                    </div>
                                )
                                }
                                />}
                            />
                        </Card>
                    </div>
                )
            }
            />
      </div>
    );
}

export default MainPage;
