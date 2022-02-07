import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import model from '../../../model.json';
import registerComponents from '../../../components/register';

const Home: NextPage = () => {
  const [page, setPage] = useState<any>()

  useEffect(() => {
    const appModel = model as any;
    let path = location.pathname;

    if (path === '/edit') {
      path = location.pathname.replace('/edit/page', '/');
    } else {
      path = location.pathname.replace('/edit/page', '');
    }

    if (appModel.pages[path]) {
      setPage(appModel.pages[path]);
    } else {
      console.log('pagina nao encontrada');
    }
  }, [])

  const renderReactElement = (el: any): any => {
    return React.createElement(
      registerComponents[el.component]?.component,
      {
        ...el.props,
        key: el.id,
      }
    )
  }

  return (
    <div>
      {
        page?.components?.map((el: any) => (
          renderReactElement(el)
        ))
      }
    </div>
  )
}

export default Home
