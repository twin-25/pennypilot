import React, { useState } from "react";
import {
  useGetAnalysisMutation,
  useGetReportMutation,
  useGetTipsMutation,
} from "../store/services/aiApi";
import Navbar from "../components/Navbar";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import Card from "../components/ui/Card";

const AiPage = () => {
  const tabs = [
    { id: "tips", label: "TIPS" },
    { id: "analysis", label: "ANALYSIS" },
    { id: "report", label: "REPORT" },
  ];
  const [active, setActive] = useState("tips");
  const [result, setResult] = useState(null);

  const [getTips, { isLoading: tipsLoading, error: tipsError }] =
    useGetTipsMutation();
  const [getAnalysis, { isLoading: analysisLoading, error: analysiosError }] =
    useGetAnalysisMutation();
  const [getReport, { isLoading: reportLoading, error: reportError }] =
    useGetReportMutation();

  const isLoading = tipsLoading || analysisLoading || reportLoading

  const handleGenerate = async () => {
    setResult(null);
    let res;
    if (active === "tips") {
      res = await getTips().unwrap();
    } else if (active === "report") {
      res = await getReport().unwrap();
    } else {
      res = await getAnalysis().unwrap();
    }

    setResult(res);
  };
  return (
    <div className="min-h-screen bg-background pt-20 p-6">
      <Navbar/>

      
      <div
        className="flex justify-between items.center  mt-5 mb-6"
      >
        <h1 className="text-text text-2xl font-bold">AI Assistant</h1>
        <Button onClick={handleGenerate} disabled={isLoading}>
          {isLoading?'Generating...': 'Generate'}
        </Button>
      </div>

      <div className="flex gap-2 mb-6">
        {tabs.map((tab)=>(
          <button
          key = {tab.id}
          onClick={()=>{setActive(tab.id); setResult(null)}}
          className={`px-4 py-2 rounded-lg text-sm font-medium cursor-poinnter transition-all
            ${active===tab.id?'bg-primary text-white':'bg-surface text-muted border border-border hover:text-text'}
            
            `}
          >
            {tab.label}

          </button>
        ))}

      </div>

      {isLoading && <Loader text='Consulting the financial oracle... 🔮'/>}

      {result && !isLoading &&(
        <div>
          {active === 'tips' && (
  <div className='flex flex-col gap-4'>
    {result.analysis?.map((tip, index) => (
      <Card key={index}>
        <div className='flex items-start gap-3'>
         
          <div>
            <p className='text-muted text-xs font-medium uppercase mb-1'>
              Tip {index + 1}
            </p>
            <p className='text-text'>{tip.tip}</p>
          </div>
        </div>
      </Card>
    ))}
  </div>
)}

          {active === 'analysis' &&(
            <div className="flex flex-col gap-5">
              {result.analysis?.map((item, index)=>(
                <Card key={index}>
                  <div className="'flex items-start gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-primarty font-medium text-sm uppercase">{item.type}-{item.category}</p>
                      <p className="text-text mt-1">{item.message}</p>
                    </div>
                  </div>
                </Card>
              ))}
              </div>
          )}
          {/* Report */}
          {active === 'report' && result.analysis && (
            <div className='flex flex-col gap-4'>

              {/* Summary */}
              <Card title='📋 Monthly Summary'>
                <p className='text-text'>{result.analysis.summary}</p>
              </Card>

              {/* Stats */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <Card title='Income'>
                  <p className='text-success text-2xl font-bold'>
                    +${result.analysis.income}
                  </p>
                </Card>
                <Card title='Expenses'>
                  <p className='text-danger text-2xl font-bold'>
                    -${result.analysis.expenses}
                  </p>
                </Card>
                <Card title='Savings'>
                  <p className='text-text text-2xl font-bold'>
                    ${result.analysis.savings}
                    <span className='text-muted text-sm ml-2'>
                      ({result.analysis.savings_rate}%)
                    </span>
                  </p>
                </Card>
              </div>

              {/* Win + Concern */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Card title='🏆 Biggest Win'>
                  <p className='text-text'>{result.analysis.biggest_win}</p>
                </Card>
                <Card title='⚠️ Biggest Concern'>
                  <p className='text-text'>{result.analysis.biggest_concern}</p>
                </Card>
              </div>

              {/* Top Categories */}
              <Card title='📊 Top Spending Categories'>
                {result.analysis.top_categories?.map((cat, index) => (
                  <div key={index} className='flex items-center justify-between py-2 border-b border-border'>
                    <p className='text-text'>{cat.icon} {cat.name}</p>
                    <p className='text-muted'>${cat.total} ({cat.percentage}%)</p>
                  </div>
                ))}
              </Card>

              {/* Next Month Tips */}
              <Card title='🎯 Next Month Recommendations'>
                {result.analysis.next_month_tips?.map((tip, index) => (
                  <p key={index} className='text-text py-2 border-b border-border'>
                    {index + 1}. {tip}
                  </p>
                ))}
              </Card>

            </div>
          )}

        </div>
      )}

      {/* Empty state */}
      {!result && !isLoading && (
        <Card>
          <div className='text-center py-8'>
            <p className='text-4xl mb-4'>🤖</p>
            <p className='text-text font-medium'>Ready to analyze your finances!</p>
            <p className='text-muted text-sm mt-2'>
              Select a feature and click Generate
            </p>
          </div>
        </Card>
      )}
          
          </div>
      )}

      
    

export default AiPage;
