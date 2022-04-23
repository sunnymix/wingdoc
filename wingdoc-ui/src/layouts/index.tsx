import Nav from '@/components/common/Nav';

export default (props: any) => {
  return <>
  <div style={{
    padding: 10,
  }}>
    <Nav/>
    <div>{props.children}</div>
  </div>
  </>
};
