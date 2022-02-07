import React, { useState } from 'react';
import { NextPage, GetServerSideProps  } from 'next';
import { Grid } from '@mui/material';
import axios from 'axios';

import registerComponents from '../../../components/register';
import PageEditor from '../../../components/core/pages/PageEditor';
import ComponentEditor from '../../../components/core/components/ComponentEditor';

interface Props {
  model: any;
  path: string;
}

const Home: NextPage<Props> = ({ model, path }) => {
  const [pageModel, setPageModel] = useState(model);

  const handleComponentUpdate = async (component: any) => {
    const result = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_API}/api/model`, { component, page: path });

    setPageModel(result.data);
  }

  const handleRemoveComponent = async (componentId: string) => {
    const result = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API}/api/model`, {
      data: { id: componentId, page: path }
    });

    setPageModel(result.data);
  }

  const renderReactElement = (el: any): any => {
    const { component, editor, name } = registerComponents[el.component];

    return (
        <ComponentEditor
          key={el.id}
          config={el}
          onComponentUpdate={handleComponentUpdate}
          onDeleteComponent={handleRemoveComponent}
        >
          {
            React.createElement(
              component,
              {
                ...el.props,
              },
            )
          }
        </ComponentEditor>
    )
  }

  return (
    <PageEditor>
      <Grid container>
        {
          pageModel.components.map((el: any) => renderReactElement(el))
        }
      </Grid>
    </PageEditor>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let path = ctx.resolvedUrl;

  if (path === '/edit/page') {
    path = path.replace('/edit/page', '');
  } else {
    path = path.replace('/edit/page/', '');
  }

  const result = await axios.get(`${process.env.BASE_API}/api/model`, {
    params: {
      path
    }
  });

  const appModel = result.data;

  if (appModel) {
    return {
      props: {
        model: appModel,
        path,
      }
    }
    
  } else {
    return {
      notFound: true,
    }
  }
}

export default Home
