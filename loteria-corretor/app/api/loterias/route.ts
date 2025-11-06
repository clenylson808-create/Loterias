import { NextResponse } from 'next/server';
import { LoteriaService } from '@/lib/loteria-service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * GET /api/loterias
 * Retorna todos os resultados das loterias ou de uma específica
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get('tipo');

    if (tipo && tipo !== 'todas') {
      // Buscar resultado de uma loteria específica
      const resultado = await LoteriaService.buscarResultado(tipo);
      
      if (!resultado) {
        return NextResponse.json(
          { error: 'Loteria não encontrada ou erro ao buscar dados' },
          { status: 404 }
        );
      }

      return NextResponse.json(resultado);
    }

    // Buscar todos os resultados
    const resultados = await LoteriaService.buscarTodosResultados();

    return NextResponse.json({
      total: resultados.length,
      resultados,
      dataAtualizacao: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erro na API de loterias:', error);
    return NextResponse.json(
      { error: 'Erro ao processar requisição' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/loterias/limpar-cache
 * Limpa o cache de resultados
 */
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'limpar-cache') {
      LoteriaService.limparCache();
      return NextResponse.json({ success: true, message: 'Cache limpo com sucesso' });
    }

    return NextResponse.json(
      { error: 'Ação não reconhecida' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Erro na API de loterias:', error);
    return NextResponse.json(
      { error: 'Erro ao processar requisição' },
      { status: 500 }
    );
  }
}
