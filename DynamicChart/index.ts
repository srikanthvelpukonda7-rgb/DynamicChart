/*
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as echarts from "echarts/core";
import { EChartsOption } from "echarts";

import {
  BarChart,
  LineChart,
  PieChart
} from "echarts/charts";

import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from "echarts/components";

import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  BarChart,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  CanvasRenderer
]);

export class DynamicChart implements ComponentFramework.StandardControl<IInputs, IOutputs> {

  private container!: HTMLDivElement;
  private chart: echarts.ECharts | null = null;

  private renderToken = 0; // prevents race conditions

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {

    this.container = container;

    this.container.style.width = "100%";
    this.container.style.height = "400px";

    this.chart = echarts.init(this.container);
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {

    const chartConfig = context.parameters.ChartConfig.raw;

    if (!chartConfig || !this.chart) return;

    let option: EChartsOption;

    try {
      option = JSON.parse(chartConfig);
    } catch (e) {
      console.error("Invalid chart JSON:", e);

      this.container.innerHTML =
        "<div style='padding:10px;color:red;'>Invalid chart configuration</div>";
      return;
    }

    // 🔥 increment render token (kills old renders automatically)
    const token = ++this.renderToken;

    // ✅ FULLY DEFERRED (safe for PCF main thread)
    requestAnimationFrame(() => {

      // ignore stale renders
      if (token !== this.renderToken || !this.chart) return;

      this.renderChart(option);
    });
  }

  private renderChart(option: EChartsOption): void {

    if (!this.chart) return;

    // ❌ DO NOT clear every time (breaks animations + causes flicker)
    // this.chart.clear();

    // ✅ universal update (works for bar/line/pie/etc.)
    this.chart.setOption(option, {
      notMerge: false,
      lazyUpdate: true
    });

    // ✅ resize safely (after render tick)
    requestAnimationFrame(() => {
      this.chart?.resize();
    });
  }

  public getOutputs(): IOutputs {
    return {};
  }

  public destroy(): void {
    this.renderToken++;

    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  }
}

*/ //working fine with limited charts

/*

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as echarts from "echarts/core";
import { EChartsOption } from "echarts";

// Charts
import { BarChart } from "echarts/charts";
import { LineChart } from "echarts/charts";
import { PieChart } from "echarts/charts";
import { ScatterChart } from "echarts/charts";
import { GaugeChart } from "echarts/charts";
import { RadarChart } from "echarts/charts";
import { FunnelChart } from "echarts/charts";
import { HeatmapChart } from "echarts/charts";
import { TreemapChart } from "echarts/charts";
import { SunburstChart } from "echarts/charts";
import { SankeyChart } from "echarts/charts";
import { CandlestickChart } from "echarts/charts";
import { BoxplotChart } from "echarts/charts";
import { PictorialBarChart } from "echarts/charts";
import { EffectScatterChart } from "echarts/charts";

// Components
import { TitleComponent } from "echarts/components";
import { TooltipComponent } from "echarts/components";
import { LegendComponent } from "echarts/components";
import { GridComponent } from "echarts/components";
import { DatasetComponent } from "echarts/components";
import { ToolboxComponent } from "echarts/components";
import { DataZoomComponent } from "echarts/components";
import { VisualMapComponent } from "echarts/components";
import { RadarComponent } from "echarts/components";
import { CalendarComponent } from "echarts/components";
import { MarkPointComponent } from "echarts/components";
import { MarkLineComponent } from "echarts/components";
import { MarkAreaComponent } from "echarts/components";

// Renderer
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
    // Charts
    BarChart,
    LineChart,
    PieChart,
    ScatterChart,
    GaugeChart,
    RadarChart,
    FunnelChart,
    HeatmapChart,
    TreemapChart,
    SunburstChart,
    SankeyChart,
    CandlestickChart,
    BoxplotChart,
    PictorialBarChart,
    EffectScatterChart,

    // Components
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DatasetComponent,
    ToolboxComponent,
    DataZoomComponent,
    VisualMapComponent,
    RadarComponent,
    CalendarComponent,
    MarkPointComponent,
    MarkLineComponent,
    MarkAreaComponent,

    // Renderer
    CanvasRenderer
]);

export class DynamicChart
    implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private container!: HTMLDivElement;
    private chart: echarts.ECharts | null = null;
    private renderToken = 0;

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {

        this.container = container;

        this.container.style.width = "100%";
        this.container.style.height = "100%";
        this.container.style.minHeight = "300px";

        this.chart = echarts.init(this.container);

        window.addEventListener("resize", this.handleResize);
    }

    public updateView(
        context: ComponentFramework.Context<IInputs>
    ): void {

        const chartConfig = context.parameters.ChartConfig.raw;

        if (!chartConfig || !this.chart) {
            return;
        }

        let option: EChartsOption;

        try {
            option = JSON.parse(chartConfig);
        }
        catch (error) {

            console.error("Invalid chart JSON:", error);

            this.container.innerHTML = `
                <div style="
                    padding:16px;
                    color:red;
                    font-family:Segoe UI;
                    font-size:14px;">
                    Invalid Chart JSON
                </div>`;

            return;
        }

        const token = ++this.renderToken;

        requestAnimationFrame(() => {

            if (
                token !== this.renderToken ||
                !this.chart
            ) {
                return;
            }

            this.chart.setOption(option, {
                notMerge: false,
                lazyUpdate: true
            });

            this.chart.resize();
        });
    }

    private handleResize = (): void => {
        this.chart?.resize();
    };

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {

        this.renderToken++;

        window.removeEventListener(
            "resize",
            this.handleResize
        );

        if (this.chart) {
            this.chart.dispose();
            this.chart = null;
        }
    }
}

*/

//wokring fine

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as echarts from "echarts/core";
import { EChartsOption } from "echarts";

// Charts
import { BarChart } from "echarts/charts";
import { LineChart } from "echarts/charts";
import { PieChart } from "echarts/charts";
import { ScatterChart } from "echarts/charts";
import { RadarChart } from "echarts/charts";
import { MapChart } from "echarts/charts";
import { TreeChart } from "echarts/charts";
import { TreemapChart } from "echarts/charts";
import { GraphChart } from "echarts/charts";
import { GaugeChart } from "echarts/charts";
import { FunnelChart } from "echarts/charts";
import { ParallelChart } from "echarts/charts";
import { SankeyChart } from "echarts/charts";
import { BoxplotChart } from "echarts/charts";
import { CandlestickChart } from "echarts/charts";
import { EffectScatterChart } from "echarts/charts";
import { LinesChart } from "echarts/charts";
import { HeatmapChart } from "echarts/charts";
import { PictorialBarChart } from "echarts/charts";
import { ThemeRiverChart } from "echarts/charts";
import { SunburstChart } from "echarts/charts";
import { CustomChart } from "echarts/charts";

// Components
import { TitleComponent } from "echarts/components";
import { TooltipComponent } from "echarts/components";
import { LegendComponent } from "echarts/components";
import { GridComponent } from "echarts/components";
import { DatasetComponent } from "echarts/components";
import { VisualMapComponent } from "echarts/components";
import { MarkPointComponent } from "echarts/components";
import { MarkLineComponent } from "echarts/components";
import { ToolboxComponent } from "echarts/components";
import { RadarComponent } from "echarts/components";
import { GeoComponent } from "echarts/components";
import { ParallelComponent } from "echarts/components";
import { CalendarComponent } from "echarts/components";
import { DataZoomComponent } from "echarts/components";
import { TimelineComponent } from "echarts/components";
import { GraphicComponent } from "echarts/components";
import { AriaComponent } from "echarts/components";
import { TransformComponent } from "echarts/components";

// Renderer
import { CanvasRenderer } from "echarts/renderers";
import { UniversalTransition } from "echarts/features";

import { LabelLayout } from "echarts/features";


echarts.use([
    // Charts
    BarChart,
    LineChart,
    PieChart,
    ScatterChart,
    RadarChart,
    MapChart,
    TreeChart,
    TreemapChart,
    GraphChart,
    GaugeChart,
    FunnelChart,
    ParallelChart,
    SankeyChart,
    BoxplotChart,
    CandlestickChart,
    EffectScatterChart,
    LinesChart,
    HeatmapChart,
    PictorialBarChart,
    ThemeRiverChart,
    SunburstChart,
    CustomChart,

    // Components
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DatasetComponent,
    VisualMapComponent,
    MarkPointComponent,
    MarkLineComponent,
    ToolboxComponent,
    RadarComponent,
    GeoComponent,
    ParallelComponent,
    CalendarComponent,
    DataZoomComponent,
    TimelineComponent,
    GraphicComponent,
    AriaComponent,
    TransformComponent,

    CanvasRenderer,
    UniversalTransition,
    LabelLayout
]);

export class DynamicChart
    implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private container!: HTMLDivElement;
    private chart: echarts.ECharts | null = null;
    private renderToken = 0;

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {

        this.container = container;

        this.container.style.width = "100%";
        this.container.style.height = "100%";
        this.container.style.minHeight = "300px";

        this.chart = echarts.init(this.container);

        window.addEventListener("resize", this.handleResize);
    }

    public updateView(
        context: ComponentFramework.Context<IInputs>
    ): void {

        const chartConfig = context.parameters.ChartConfig.raw;

        if (!chartConfig || !this.chart) {
            return;
        }
        

        let option: EChartsOption;

        try {
            option = JSON.parse(chartConfig);
        }
        catch (error) {

           console.error("Invalid chart JSON:", error);
           console.error("Raw JSON:", chartConfig);

            this.container.innerHTML = `
                <div style="
                    padding:16px;
                    color:red;
                    font-family:Segoe UI;
                    font-size:14px;">
                    Invalid Chart JSON
                </div>`;

            return;
        }

        const token = ++this.renderToken;

        requestAnimationFrame(() => {

            if (
                token !== this.renderToken ||
                !this.chart
            ) {
                return;
            }

            this.chart.setOption(option, {
                notMerge: false,
                lazyUpdate: true
            });

            this.chart.resize();
        });
    }

    private handleResize = (): void => {
        this.chart?.resize();
    };

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {

        this.renderToken++;

        window.removeEventListener(
            "resize",
            this.handleResize
        );

        if (this.chart) {
            this.chart.dispose();
            this.chart = null;
        }
    }
}