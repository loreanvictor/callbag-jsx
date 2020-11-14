import { RendererLike } from '@connectv/html';

export function Table({header, body}: {header: any, body: any}, renderer: RendererLike<any, any>, content: any) {

  return <div style='overflow-x: auto'>
    <table style='min-width: 100%;'>
      <thead>{header}</thead>
      <tbody>{body}</tbody>
    </table>
  </div>;
}
